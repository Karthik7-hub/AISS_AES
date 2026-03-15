import Faculty from "../../models/faculty.js";


// Approve Faculty
export const approveFaculty = async (req, res) => {
  try {

    const { facultyId } = req.body;

    const faculty = await Faculty.findById(facultyId);

    faculty.isApproved = true;
    faculty.approvedBy = req.user.id;

    await faculty.save();

    res.json({ message: "Faculty approved" });

  } catch (error) {
    res.status(500).json(error);
  }
};


// Make HOD
export const makeHOD = async (req, res) => {
  try {

    const { facultyId } = req.body;

    const faculty = await Faculty.findById(facultyId);

    faculty.role = "hod";

    await faculty.save();

    res.json({ message: "Faculty promoted to HOD" });

  } catch (error) {
    res.status(500).json(error);
  }
};


// Transfer Super Admin
export const transferSuperAdmin = async (req, res) => {
  try {

    const { facultyId } = req.body;

    const faculty = await Faculty.findById(facultyId);

    faculty.role = "superAdmin";

    await faculty.save();

    res.json({ message: "Super admin role transferred" });

  } catch (error) {
    res.status(500).json(error);
  }
};