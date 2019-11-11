import { range, zpadding } from './util';

let id = 0;

export default {
  methods: {
    $pickDate({ value, min, max, onChange, onCancel }) {
      min = destruct(min);
      max = destruct(max);
      value = value ? destruct(value) : min;

      const xrange = getXrange(min, max);
      const ranges = getRanges(min, max);
      value = getIndexValue(xrange, value);

      this.$_pickDate({
        ranges,
        xrange,
        value,
        onCancel,
        onChange: (val) => {
          const [y, m, d] = val.map((x, i) => {
            return xrange[i].base + x;
          });
          const str = `${y}-${zpadding(m)}-${zpadding(d)}`;
          onChange(str);
        }
      });
    },

    $_pickDate({ ranges, xrange, value, onChange, onCancel }) {
      id++;
      this.$pick({
        ranges: ranges,
        value: value,
        force: [id, id, id],
        onChange: onChange,
        onCancel: onCancel,
        onColumnChange: (col, val) => {
          value[col] = val;
          value = fixIndexValue(xrange, value);
          this.$_pickDate({
            ranges,
            xrange,
            value,
            onChange,
            onCancel
          });
        }
      });
    }
  }
};

function getRanges(min, max) {
  return [
    range(min[0], max[0]).map(x => x + '年'),
    range(1, 12).map(x => x + '月'),
    range(1, 31).map(x => x + '日'),
  ];
}

function getIndexValue(xrange, val) {
  const basedIndex = val.map((v, i) => {
    return v - xrange[i].base;
  });

  return fixIndexValue(xrange, basedIndex);
}

function fixIndexValue(xrange, ival) {
  const val = ival.slice();
  const size = xrange.length;
  let i = 0;
  let lower = true;
  let upper = true;

  while (i < size && (lower || upper)) {
    if (lower) {
      if (val[i] < xrange[i].min) {
        upper = false;
        break;
      }
      if (val[i] > xrange[i].min) {
        lower = false;
      }
    }
    if (upper) {
      if (val[i] > xrange[i].max) {
        lower = false;
        break;
      }
      if (val[i] < xrange[i].max) {
        upper = false;
      }
    }
    i++;
  }

  if (lower) {
    while (i < size) {
      val[i] = xrange[i].min;
      i++;
    }
  } else if (upper) {
    while (i < size) {
      val[i] = xrange[i].max;
      i++;
    }
  }

  const maxDaysIdx = daysInMonth(xrange[0].base + val[0], val[1]) - 1;
  if (val[2] > maxDaysIdx) {
    val[2] = maxDaysIdx;
  }

  return val;
}

function getXrange(min, max) {
  return [
    {
      base: min[0],
      min: 0,
      max: max[0] - min[0]
    },

    {
      base: 1,
      min: min[1]-1,
      max: max[1]-1
    },

    {
      base: 1,
      min: min[2]-1,
      max: max[2]-1
    }
  ];
}

function destruct(string) {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(string);
  if (!r)
    throw new Error('invalid date string: ' + string);

  const year = ~~r[1];
  const month = ~~r[2];
  if (!(month > 0 && month <= 12))
    throw new Error('invalid date string: ' + string);

  const date = ~~r[3];
  if (!(date > 0 && date <= 31) || (date > daysInMonth(year, month-1)))
    throw new Error('invalid date string: ' + string);

  return [year, month, date];
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex+1, 0).getDate();
}
