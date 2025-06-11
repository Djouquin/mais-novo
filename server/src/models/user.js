import mongoose from 'mongoose'
const bcrypt = require('bcrypt');  // Para hashing de senha

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: false },
    admin: { type: Boolean, default: false },
});

// Antes de salvar o usuário, criptografa a senha
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    
    const salt = await bcrypt.genSalt(10);
    try {
        this.senha = await bcrypt.hash(this.senha, salt);
        
    } catch (error) {
        console.log(error);
    }
    next();
});

// Método para verificar a senha
userSchema.methods.comparePassword = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
