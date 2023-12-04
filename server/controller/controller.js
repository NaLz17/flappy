const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

class authController {
  async registration(req, res, next) {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      return next(new ApiError(400, "Неправильно задана почта или пароль."));
    }
    let candidate = await db.query("SELECT * FROM users where email = $1", [email]);
    if (candidate.rows[0]) {
      return next(
        new ApiError(400, "Пользователь с такой почтой уже существует.")
      );
    }
    candidate = await db.query("SELECT * FROM users where username = $1", [
      username,
    ]);
    if (candidate.rows[0]) {
      return next(
        new ApiError(
          400,
          "Пользователь с таким именем пользователя уже существует."
        )
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const newPerson = await db.query(
      "INSERT INTO users (email, username, password, score) values ($1, $2, $3, $4) RETURNING *",
      [email, username, hashPassword, 0]
    );
    res.json(newPerson.rows[0]);
  }
  
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    if (!user.rows[0]) {
      return next(new ApiError(404, "Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!comparePassword) {
      return next(new ApiError(404, "Неверный пароль"));
    }
    const token = jwt.sign(
      { id: user.rows[0].id, email: email, username: user.rows[0].username },
      process.env.SECRET_KEY,
      { expiresIn: "48h" }
    );
    res.json(token);
  }

  async leaders(req, res) {
    const best_five = await db.query(
      "SELECT username, score FROM users ORDER BY score DESC limit 5"
    );
    res.json(best_five.rows);
  }

  async check(req, res) {
    const user = await db.query("SELECT * FROM users where email = $1", [
      req.user.email,
    ]);
    return res.json(user.rows[0]);
  }

  async updateScore(req, res) {
    const { score } = req.body;
    const upUser = await db.query(
      "UPDATE users set score = $1 where username = $2 RETURNING *",
      [score, req.user.username]
    );
    res.json(upUser.rows[0]);
  }

  async updatePass(req, res) {
    const { newPass } = req.body;
    const hashPassword = await bcrypt.hash(newPass, 3);
    const upUser = await db.query(
      "UPDATE users set password = $1 where username = $2 RETURNING *",
      [hashPassword, req.user.username]
    );
    res.json(upUser.rows[0]);
  }
  async updateSound(req, res) {
    const upUser = await db.query(
      "UPDATE users set sound = $1 where username = $2 RETURNING *",
      [req.body.sound, req.user.username]
    );
    res.json(upUser.rows[0]);
  }
  async updateSkin(req, res) {
    const upUser = await db.query(
      "UPDATE users set skin = $1 where username = $2 RETURNING *",
      [req.body.skin, req.user.username]
    );
    res.json(upUser.rows[0]);
  }

  async deleteUser(req, res) {
    try {
      const { email } = req.body;
  
      // Удаляем пользователя с указанным email и adminLvl = 0
      const deletedUser = await db.query(
        "DELETE FROM users WHERE email = $1 AND adminLvl = 0 RETURNING *",
        [email]
      );

      // Проверяем, был ли удален пользователь
      if (deletedUser.rows.length === 0) {
        // Если пользователь не был удален, возвращаем сообщение об ошибке
        return res.status(404).json({ error: "User not found or is not deletable" });
      }
  
      // Если пользователь был успешно удален, возвращаем удаленного пользователя
      res.json(deletedUser.rows[0]);
    } catch (error) {
      // В случае ошибки, возвращаем сообщение об ошибке сервера
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async createAdmin(req, res) {
    try {
      const { email } = req.body;
  
      // добавляем администратора с указанным email и adminLvl = 0
      const deletedUser = await db.query(
        "UPDATE users SET adminLvl = 1 WHERE email = $1 AND adminLvl = 0 RETURNING *",
        [email]
      );

      // Проверяем, был ли добавлен администратор
      if (deletedUser.rows.length === 0) {
        // Если администратор не был, возвращаем сообщение об ошибке
        return res.status(404).json({ error: "User not found or is already an administrator" });
      }
  
      // Если администратор был успешно создан, возвращаем созданного администратора
      res.json(deletedUser.rows[0]);
    } catch (error) {
      // В случае ошибки, возвращаем сообщение об ошибке сервера
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async deleteAdmin(req, res) {
    try {
      const { email } = req.body;
  
      // Удаляем алминистратора с указанным email и adminLvl = 0
      const deletedUser = await db.query(
        "UPDATE users SET adminLvl = 0 WHERE email = $1 AND adminLvl = 1 RETURNING *",
        [email]
      );

      // Проверяем, был ли удален администратор
      if (deletedUser.rows.length === 0) {
        // Если администратор не был удален, возвращаем сообщение об ошибке
        return res.status(404).json({ error: "User not found or is not deletable" });
      }
  
      // Если администратор был успешно удален, возвращаем удаленного администратора
      res.json(deletedUser.rows[0]);
    } catch (error) {
      // В случае ошибки, возвращаем сообщение об ошибке сервера
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
}



module.exports = new authController();
