const categoryService = require("../../../services/categoryService");

module.exports = {
    async getAllCategory(req, res) {
        try {
            const category = await categoryService.findAll();
            res.status(200).json({
                status: "success",
                data: category,
              });
        } catch (error) {
            res.status(500).json({
                name: error.name,
                message: error.message,
            });
        }
    },
    async find(req, res) {
        try {
            const id = req.params.id;
            const category = await categoryService.findById(id);
            res.status(200).json({
                status: "success",
                data: category,
            });
            console.log(category, "ini category");
        } catch (error) {
            if (error.name === "categoryNotFound") {
                res.status(404).json({
                  name: error.name,
                  message: error.message,
                });
            } else {
                res.status(500).json({
                    name: error.name,
                    message: error.message,
                });
            }
        }
    }
}