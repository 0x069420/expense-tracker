import bcrypt from "bcrypt";
const saltRounds = 10;

export async function hashPassword(password) {

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error al hashear la contraseña:", err);
    throw err;
  }
}
