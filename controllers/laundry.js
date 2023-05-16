import Laundry from "../models/laundryModel.js";

export const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findAll({
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "kota", "latitude", "longitude", "photo"],
    });
    res.json({
      message: "Laundry fetched successfully",
      data: {
        laundry,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLaundryById = async (req, res) => {
  const laundryId = req.params.id;
  try {
    const laundry = await Laundry.findByPk(laundryId, {
      attributes: ["id", "nama_laundry", "tanggal_berdiri", "kota", "latitude", "longitude", "photo"],
    });
    if (!laundry) return res.status(404).json({ message: "Laundry tidak ditemukan" });
    res.status(200).json({
      message: "Laundry fetched successfully",
      data: {
        laundry,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const laundry = async (req, res) => {
  const { nama_laundry, tanggal_berdiri, kota, latitude, longitude } = req.body;
  if (!nama_laundry || !tanggal_berdiri || !kota || !latitude || !longitude)
    return res.status(400).json({
      message: "Please complete input data",
    });
  try {
    await Laundry.create({
      nama_laundry: nama_laundry,
      tanggal_berdiri: tanggal_berdiri,
      kota: kota,
      latitude: latitude,
      longitude: longitude,
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
