export const getKategoriPelanggaranFilter = (search: string) => {
  const filters = `filters=namaKategori CONTAINS "${search}"`;

  return filters;
};
