import ProvincesData from "./ProvincesData";

const Provinces = ProvincesData.map((province) => {
  return { label: province.name, value: province.name };
});

export default Provinces;
