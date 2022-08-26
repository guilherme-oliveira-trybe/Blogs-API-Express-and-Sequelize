const { loginService } = require('../services');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const resultLogin = await loginService.login({ email, password });

    res.status(200).json(resultLogin);
  },
};

module.exports = loginController;