function generateCard({
    goodWord,
    badWord,
    nbBadWords,
    nbPlayers,
}: {
    goodWord: string;
    badWord: string;
    nbBadWords: number;
    nbPlayers: number;
}) {
    const card = [];
    card.push({ word: "Mister White", isBad: true, player: null });
    for (let i = 0; i < nbBadWords; i++) {
        card.push({ word: badWord, isBad: true, player: null });
    }
    for (let i = nbBadWords + 1; i < nbPlayers; i++) {
        card.push({ word: goodWord, isBad: false, player: null });
    }

    for (let i = card.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [card[i], card[j]] = [card[j], card[i]];
    }
    return card;
};

function getWord(): { goodWord: string, badWord: string } 
{
    const words = [
        { goodWord: "Pomme", badWord: "Poire" },
        { goodWord: "Chat", badWord: "Chien" },
        { goodWord: "Voiture", badWord: "Camion" },
        { goodWord: "Plage", badWord: "Piscine" },
        { goodWord: "École", badWord: "Université" },
        { goodWord: "Montagne", badWord: "Colline" },
        { goodWord: "Téléphone", badWord: "Tablette" },
        { goodWord: "Lune", badWord: "Soleil" },
        { goodWord: "Mer", badWord: "Océan" },
        { goodWord: "Neige", badWord: "Glace" },
        { goodWord: "Avion", badWord: "Hélicoptère" },
        { goodWord: "Train", badWord: "Métro" },
        { goodWord: "Pizza", badWord: "Burger" },
        { goodWord: "Guitare", badWord: "Piano" },
        { goodWord: "Football", badWord: "Basketball" },
        { goodWord: "Crayon", badWord: "Stylo" },
        { goodWord: "Fourchette", badWord: "Cuillère" },
        { goodWord: "Maison", badWord: "Appartement" },
        { goodWord: "Film", badWord: "Série" },
        { goodWord: "Ordinateur", badWord: "Télévision" },
        { goodWord: "Forêt", badWord: "Jungle" },
        { goodWord: "Danse", badWord: "Chant" },
        { goodWord: "Peinture", badWord: "Dessin" },
        { goodWord: "Sculture", badWord: "Peinture" },
        { goodWord: "Tigre", badWord: "Lion" },
        { goodWord: "Éléphant", badWord: "Mammouth" },
        { goodWord: "Papillon", badWord: "Moustique" },
        { goodWord: "Cactus", badWord: "Bambou" },
        { goodWord: "Fraise", badWord: "Framboise" },
        { goodWord: "Carotte", badWord: "Radis" },
        { goodWord: "Miel", badWord: "Sucre" },
        { goodWord: "Montre", badWord: "Horloge" },
        { goodWord: "Chapeau", badWord: "Casquette" },
        { goodWord: "Miroir", badWord: "Vitre" },
        { goodWord: "Chocolat", badWord: "Vanille" },
        { goodWord: "Poisson", badWord: "Requin" },
        { goodWord: "Serpent", badWord: "Lézard" },
        { goodWord: "Parfum", badWord: "Déodorant" },
        { goodWord: "Douche", badWord: "Bain" },
        { goodWord: "Vélo", badWord: "Trottinette" },
        { goodWord: "Trampoline", badWord: "Toboggan" },
        { goodWord: "Loup", badWord: "Renard" },
        { goodWord: "Étoile", badWord: "Planète" },
        { goodWord: "Bureau", badWord: "Table" },
        { goodWord: "Carte (map)", badWord: "Plan" },
        { goodWord: "Verre", badWord: "Tasse" },
        { goodWord: "Ciel", badWord: "Nuage" },
        { goodWord: "Arc-en-ciel", badWord: "Couleurs" },
        { goodWord: "Canard", badWord: "Oie" },
        { goodWord: "Boulangerie", badWord: "Pâtisserie" },
        { goodWord: "Épée", badWord: "Dague" },
        { goodWord: "Épée", badWord: "Bouclier" },
        { goodWord: "Château", badWord: "Forteresse" },
        { goodWord: "Robot", badWord: "Android" },
        { goodWord: "Nuage", badWord: "Brume" },
        { goodWord: "Fusée", badWord: "Satellite" },
        { goodWord: "Briquet", badWord: "Allumette" },
        { goodWord: "Magie", badWord: "Illusion" },
        { goodWord: "Sommeil", badWord: "Rêve" },
        { goodWord: "Thé", badWord: "Café" },
        { goodWord: "Coca", badWord: "Oasis" },
        { goodWord: "Pain", badWord: "Croissant" },
        { goodWord: "Salade", badWord: "Soupe" },
        { goodWord: "Orage", badWord: "Tornade" },
        { goodWord: "Rivière", badWord: "Fleuve" },
        { goodWord: "Télécommande", badWord: "Joystick" },
        { goodWord: "Baguette", badWord: "Pain" },
        { goodWord: "Ananas", badWord: "Mangue" },
        { goodWord: "Escalier", badWord: "Ascenseur" },
        { goodWord: "Sable", badWord: "Poussière" },
        { goodWord: "Brosse", badWord: "Peigne" },
        { goodWord: "Clé", badWord: "Serrure" },
        { goodWord: "Map", badWord: "Boussole" },
        { goodWord: "Tente", badWord: "Camping" },
        { goodWord: "Corde", badWord: "Chaîne" },
        { goodWord: "Statue", badWord: "Sculpture" },
        { goodWord: "Couteau", badWord: "Dague" },
        { goodWord: "Lampe", badWord: "Bougie" },
        { goodWord: "Bois", badWord: "Forêt" },
        { goodWord: "Télévision", badWord: "Écran" },
        { goodWord: "Montre", badWord: "Bracelet" },
        { goodWord: "Chaise", badWord: "Tabouret" },
        { goodWord: "Savon", badWord: "Shampooing" },
        { goodWord: "Fleur", badWord: "Rose" },
        { goodWord: "Horloge", badWord: "Réveil" },
        { goodWord: "Edgar", badWord: "Silvia" },
        { goodWord: "Dorvann", badWord: "Maxime" },
        { goodWord: "Mathieu", badWord: "Alexandre" },
        { goodWord: "Ruru", badWord: "Azyanah" },
    ];
    return words[Math.floor(Math.random() * words.length)];
}

export { generateCard, getWord };