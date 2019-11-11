import data from './region.data.js';

const { provinces, cities_map, districts_map } = data;

export default {
  data,

  id2index(id) {
    const parts = id.split(',');
    const i0 = provinces.findIndex(p => p.value === parts[0]);
    if (i0 < 0) {
      throw new Error('未匹配到地区ID:' + id);
    }

    // 后面两个不一定有
    let i1 = 0, i2 = 0;

    if (parts.length > 1) {
      const cities = cities_map[parts[0]];
      i1 = cities.findIndex(c => c.value === parts[1]);
      if (i1 < 0) {
        throw new Error('未匹配到地区ID:' + id);
      }
    }

    if (parts.length > 2) {
      const districts = districts_map[parts[1]];
      i2 = districts.findIndex(c => c.value === parts[2]);
      if (i2 < 0) {
        throw new Error('未匹配到地区ID:' + id);
      }
    }

    return [i0,i1,i2];
  },

  index2id(indexArray) {
    const province = provinces[indexArray[0]];
    const city = province && cities_map[province.value][indexArray[1]];
    const district = city && districts_map[city.value][indexArray[2]];

    return [province, city, district]
      .filter(x => (x && x.value))
      .map(x => x.value)
      .join(',');
  },

  index2str(indexArray) {
    const province = provinces[indexArray[0]];
    const city = province && cities_map[province.value][indexArray[1]];
    const district = city && districts_map[city.value][indexArray[2]];

    return [province, city, district]
      .filter(x => (x && x.name))
      .map(x => x.name)
      .join('');
  }
};

