import region from '../../DATA/region';

const { provinces, cities_map, districts_map } = region.data;

export default {
  methods: {
    $pickRegion({ id, onChange, onCancel }) {
      const value = id ? region.id2index(id) : [0,0,0];

      this.$_pickRegion({
        value: value,
        onCancel: onCancel,
        onChange: (val) => {
          onChange({
            index: val,
            string: region.index2str(val),
            id: region.index2id(val)
          });
        }
      });
    },

    $_pickRegion({ value, onChange, onCancel }) {
      const province = provinces[value[0]];
      const cities = cities_map[province.value] || [];
      const city = cities[value[1]];
      const districts = city ? districts_map[city.value] : [];
      const ranges = [
        provinces,
        cities,
        districts
      ];

      this.$pick({
        ranges: ranges,
        rkey: 'name',
        value: value,
        onCancel: onCancel,
        onChange: onChange,
        onColumnChange: (col, val) => {
          const v = value.slice();
          v[col] = val;
          col++;
          while (col < 3) {
            v[col] = 0;
            col++;
          }
          this.$_pickRegion({
            value: v,
            onChange,
            onCancel
          });
        }
      });
    }
  }
};
