import { Router } from "express";

const router = Router()

router.post("/checkout", async (req, res) => {
    const reqBody = await req.body;
    const { email, price } = reqBody;

    // Vérifier que le prix est un nombre valide et le convertir en centimes entiers
    if(typeof price !== "number" || isNaN(price) || price <=0) {
        return res.status(400).send({
            success: false,
            message: "Valeur de prix invalide",
        });
    }

    //Convertir un prix en cents et s'assurer que c'est un entier valide
    const amountInCents = Math.round(price * 100);
    try {
        
    } catch (error) {
        
    }
});

export default router; 