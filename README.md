# Ruru Undercover - Application Mobile

## 📌 Présentation
Ruru Undercover est une application mobile développée en **React Native avec Expo**. Elle permet aux utilisateurs de créer un **lobby de joueurs**, d'ajouter/modifier des joueurs avec une **photo et un nom**, puis de démarrer une partie [d'undercover](https://www.yanstarstudio.com/fr/undercover-how-to-play)

## 🛠️ Technologies Utilisées
- **React Native** (Framework mobile)
- **Expo** (Facilite le développement et le déploiement)
- **TypeScript** (Typage robuste du code)
- **react-native-gesture-handler** (Gestion des gestes et interactions)
- **react-native-paper** (Composants UI)
- **react-native-safe-area-context** (Gestion des marges sécurisées)
- **AsyncStorage** (Stockage local des paramètres utilisateur)

## 🎮 Fonctionnalités
### ✅ **Lobby**
- Ajouter jusqu'à **20 joueurs**.
- Modifier le **nom** d'un joueur.
- Ajouter une **photo** (depuis la galerie ou en prenant une photo).
- Supprimer un joueur.
- Lancer une partie si **au moins 4 joueurs** sont présents.
- Transfert des joueurs vers l'écran **Game**.

### ✅ **Game**
- Récupération des joueurs du **Lobby**.
- Affichage en **grille de 3 joueurs par ligne**.
- les joueurs peuvent choisir leurs cartes et ensuite donne un ordre de passage et peux révéler les roles en appuyant sur le joueurs

### ✅ **Settings**
- **Activer/désactiver les notifications** (pas de notification pour le moment).
- **Définir le nombre de joueurs Undercover**
- Sauvegarde automatique avec **AsyncStorage**.

## 🚀 Installation et Lancement
### 1️⃣ **Cloner le projet**
```sh
git clone https://github.com/rurueuh/my_undercover/
cd my_undercover
```

### 2️⃣ **Installer les dépendances**
```sh
npm install
```

### 3️⃣ **Lancer le projet avec Expo**
```sh
npx expo start
```

### **Pour installer simplement l'application l'apk est disponible**

## 📷 Gestion des Images


- Les utilisateurs peuvent **ajouter une photo** à chaque joueur.
- Les images sont récupérées depuis la **galerie** ou en utilisant **l'appareil photo**.
- Les images sont **affichées sous le nom du joueur**.


## 📷 Quelques Images du jeu
|      |  |       |  |
| ---      | ---       | ---       | ---       |
| ![image](https://github.com/user-attachments/assets/114b4613-6e87-408d-9d55-6198386ee43e) | ![image](https://github.com/user-attachments/assets/9fcd0cd2-4d5f-4eee-bf0f-dc1e91dd13fb) |![image](https://github.com/user-attachments/assets/c0f2a46b-b118-408d-b5ee-6b62ab7d9920) | ![image](https://github.com/user-attachments/assets/45b4d00f-7945-4abe-bf52-8ec1f21840c5) |
| ![image](https://github.com/user-attachments/assets/b9597458-c466-45d2-b289-76ccd811b0da)     | ![image](https://github.com/user-attachments/assets/02f7a916-0261-4c59-9bf9-a77d36f4f420)  | ![image](https://github.com/user-attachments/assets/3577d934-d756-4881-aa14-bf3861657e33) | ![image](https://github.com/user-attachments/assets/00709ab5-55a9-4b57-a3d2-d80fdec1eafa)  |








