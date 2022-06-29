const categoryRepository = require("../repositories/categoryRepository");

module.exports = {
    async findAll() {
        try {
            return await categoryRepository.getAllCategory();
        } catch (error) {
            throw error;
        }
    },
    async findById(id) {
        try {
            const category = await categoryRepository.find(id);
            if (!category) {
              throw {
                name: "categoryNotFound",
                message: "Category is not found",
              };
            }
            return category;        
        } catch (error) {
            throw error;
        }
    },
}