warning: in the working copy of 'script.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/chicken/chicken.html b/chicken/chicken.html[m
[1mdeleted file mode 100644[m
[1mindex 7a46d17..0000000[m
[1m--- a/chicken/chicken.html[m
[1m+++ /dev/null[m
[36m@@ -1,535 +0,0 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html lang="en">[m
[31m-<head>[m
[31m-    <meta charset="UTF-8">[m
[31m-    <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <title>Epic Chicken Adventure</title>[m
[31m-    <style>[m
[31m-        /* Integrated CSS from style.css */[m
[31m-        :root {[m
[31m-            --dark-gray: #161616;[m
[31m-            --green: #346751;[m
[31m-            --red: #C84B31;[m
[31m-            --beige: #ECDBBA;[m
[31m-            --yellow: #FFD700;[m
[31m-        }[m
[31m-        body {[m
[31m-            font-family: 'Arial', sans-serif;[m
[31m-            background-color: var(--dark-gray);[m
[31m-            color: var(--beige);[m
[31m-            margin: 0;[m
[31m-            padding: 0;[m
[31m-        }[m
[31m-        .hero {[m
[31m-            min-height: 100vh;[m
[31m-            display: flex;[m
[31m-            align-items: center;[m
[31m-            justify-content: center;[m
[31m-            flex-direction: column;[m
[31m-            padding: 20px;[m
[31m-        }[m
[31m-        .typewriter {[m
[31m-            color: var(--red);[m
[31m-            font-size: 2rem;[m
[31m-        }[m
[31m-        #gameText {[m
[31m-            margin: 20px;[m
[31m-            padding: 20px;[m
[31m-            background-color: var(--green);[m
[31m-            border-radius: 10px;[m
[31m-            color: var(--beige);[m
[31m-            min-height: 80px;[m
[31m-            text-align: center;[m
[31m-            width: 80%;[m
[31m-            max-width: 600px;[m
[31m-        }[m
[31m-        .game-btn {[m
[31m-            margin: 8px;[m
[31m-            padding: 12px 20px;[m
[31m-            background-color: var(--red);[m
[31m-            color: var(--beige);[m
[31m-            border: none;[m
[31m-            border-radius: 8px;[m
[31m-            cursor: pointer;[m
[31m-            font-size: 16px;[m
[31m-            transition: transform 0.2s, background-color 0.2s;[m
[31m-        }[m
[31m-        .game-btn:hover {[m
[31m-            transform: scale(1.05);[m
[31m-            background-color: #e05a3f;[m
[31m-        }[m
[31m-        .game-btn:active {[m
[31m-            transform: scale(0.98);[m
[31m-        }[m
[31m-        #stats {[m
[31m-            display: flex;[m
[31m-            justify-content: space-between;[m
[31m-            width: 80%;[m
[31m-            max-width: 600px;[m
[31m-            background-color: rgba(52, 103, 81, 0.7);[m
[31m-            padding: 15px;[m
[31m-            border-radius: 10px;[m
[31m-            margin-bottom: 20px;[m
[31m-        }[m
[31m-        .stat {[m
[31m-            display: flex;[m
[31m-            flex-direction: column;[m
[31m-            align-items: center;[m
[31m-        }[m
[31m-        .stat-value {[m
[31m-            font-size: 24px;[m
[31m-            font-weight: bold;[m
[31m-            color: var(--beige);[m
[31m-        }[m
[31m-        .stat-label {[m
[31m-            font-size: 14px;[m
[31m-            color: var(--beige);[m
[31m-            opacity: 0.8;[m
[31m-        }[m
[31m-        #chicken-container {[m
[31m-            position: relative;[m
[31m-            height: 200px;[m
[31m-            width: 200px;[m
[31m-            margin: 20px 0;[m
[31m-        }[m
[31m-        #chicken {[m
[31m-            position: absolute;[m
[31m-            height: 150px;[m
[31m-            width: 150px;[m
[31m-            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="30" fill="%23f5f0e1"/><circle cx="42" cy="34" r="3" fill="%23000"/><circle cx="58" cy="34" r="3" fill="%23000"/><path d="M50 50 L40 60 L50 55 L60 60 Z" fill="%23FF6B35"/><circle cx="50" cy="80" r="18" fill="%23f5f0e1"/></svg>');[m
[31m-            background-repeat: no-repeat;[m
[31m-            background-position: center;[m
[31m-            transition: transform 0.3s;[m
[31m-        }[m
[31m-        .chicken-attack {[m
[31m-            animation: attackAnim 0.5s ease-in-out;[m
[31m-        }[m
[31m-        .shop-item {[m
[31m-            display: flex;[m
[31m-            justify-content: space-between;[m
[31m-            align-items: center;[m
[31m-            padding: 10px;[m
[31m-            margin: 5px 0;[m
[31m-            background-color: rgba(52, 103, 81, 0.5);[m
[31m-            border-radius: 5px;[m
[31m-        }[m
[31m-        .shop-btn {[m
[31m-            background-color: var(--yellow);[m
[31m-            color: var(--dark-gray);[m
[31m-            border: none;[m
[31m-            border-radius: 5px;[m
[31m-            padding: 5px 10px;[m
[31m-            cursor: pointer;[m
[31m-        }[m
[31m-        .shake {[m
[31m-            animation: shake 0.5s;[m
[31m-        }[m
[31m-        .level-indicator {[m
[31m-            position: absolute;[m
[31m-            top: 10px;[m
[31m-            right: 10px;[m
[31m-            background-color: var(--red);[m
[31m-            padding: 5px 10px;[m
[31m-            border-radius: 20px;[m
[31m-            font-weight: bold;[m
[31m-        }[m
[31m-        #screen-container {[m
[31m-            width: 100%;[m
[31m-            max-width: 800px;[m
[31m-        }[m
[31m-        .screen {[m
[31m-            display: none;[m
[31m-            flex-direction: column;[m
[31m-            align-items: center;[m
[31m-            width: 100%;[m
[31m-        }[m
[31m-        .active-screen {[m
[31m-            display: flex;[m
[31m-        }[m
[31m-        @keyframes attackAnim {[m
[31m-            0% { transform: translateY(0) scale(1); }[m
[31m-            50% { transform: translateY(-50px) scale(1.2); }[m
[31m-            100% { transform: translateY(0) scale(1); }[m
[31m-        }[m
[31m-        @keyframes shake {[m
[31m-            0% { transform: translateX(0); }[m
[31m-            25% { transform: translateX(-10px); }[m
[31m-            50% { transform: translateX(10px); }[m
[31m-            75% { transform: translateX(-10px); }[m
[31m-            100% { transform: translateX(0); }[m
[31m-        }[m
[31m-    </style>[m
[31m-</head>[m
[31m-<body>[m
[31m-    <div class="hero">[m
[31m-        <h1>Epic Chicken Adventure</h1>[m
[31m-        <div class="level-indicator">Level: <span id="level-display">1</span></div>[m
[31m-        [m
[31m-        <div id="stats">[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="health-value">100</div>[m
[31m-                <div class="stat-label">❤️ Health</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="score-value">0</div>[m
[31m-                <div class="stat-label">🏆 Score</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="bananas-value">0</div>[m
[31m-                <div class="stat-label">🍌 Bananas</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="potions-value">2</div>[m
[31m-                <div class="stat-label">💊 Potions</div>[m
[31m-            </div>[m
[31m-        </div>[m
[31m-        [m
[31m-        <div id="screen-container">[m
[31m-            <div id="game-screen" class="screen active-screen">[m
[31m-                <div id="chicken-container">[m
[31m-                    <div id="chicken"></div>[m
[31m-                </div>[m
[31m-                <div id="gameText">Welcome to Epic Chicken Adventure! Fight chickens, collect bananas, and become the Chicken Master!</div>[m
[31m-                <div>[m
[31m-                    <button class="game-btn" onclick="fightChicken()">🐔 Fight Chicken</button>[m
[31m-                    <button class="game-btn" onclick="searchBananas()">🔍 Search Bananas</button>[m
[31m-                    <button class="game-btn" onclick="dance()">🧦 Dance</button>[m
[31m-                    <button class="game-btn" onclick="usePotion()">💊 Use Potion</button>[m
[31m-                    <button class="game-btn" onclick="showShop()">🛒 Shop</button>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            [m
[31m-            <div id="shop-screen" class="screen">[m
[31m-                <h2>Banana Shop</h2>[m
[31m-                <div id="gameText">Spend your bananas on powerful upgrades!</div>[m
[31m-                <div style="width: 100%; max-width: 500px;">[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Health Potion (25 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('potion')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Extra Health (30 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('health')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Chicken Repellent (50 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('repellent')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Golden Feather (75 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('feather')">Buy</button>[m
[31m-                    </div>[m
[31m-                </div>[m
[31m-                <button class="game-btn" onclick="hideShop()">Return to Game</button>[m
[31m-            </div>[m
[31m-        </div>[m
[31m-    </div>[m
[31m-[m
[31m-    <script>[m
[31m-        // Global game state[m
[31m-        var health = 100;[m
[31m-        var maxHealth = 100;[m
[31m-        var bananas = 0;[m
[31m-        var potions = 2;[m
[31m-        var score = 0;[m
[31m-        var level = 1;[m
[31m-        var chickenStrength = 1;[m
[31m-        var hasRepellent = false;[m
[31m-        var hasFeather = false;[m
[31m-        [m
[31m-        // Simple sound functions - no large base64 encoded data[m
[31m-        function playHitSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        function playCollectSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        function playLevelUpSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-[m
[31m-        // Initialize game[m
[31m-        window.onload = function() {[m
[31m-            updateStats();[m
[31m-        };[m
[31m-[m
[31m-        // Update stats display[m
[31m-        function updateStats() {[m
[31m-            document.getElementById("health-value").textContent = health;[m
[31m-            document.getElementById("bananas-value").textContent = bananas;[m
[31m-            document.getElementById("potions-value").textContent = potions;[m
[31m-            document.getElementById("score-value").textContent = score;[m
[31m-            document.getElementById("level-display").textContent = level;[m
[31m-            [m
[31m-            // Check for level up[m
[31m-            if (score >= level * 100) {[m
[31m-                levelUp();[m
[31m-            }[m
[31m-            [m
[31m-            // Check for game over[m
[31m-            if (health <= 0) {[m
[31m-                gameOver();[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        // Chicken fight with variety[m
[31m-        function fightChicken() {[m
[31m-            // Animate chicken[m
[31m-            var chicken = document.getElementById("chicken");[m
[31m-            chicken.classList.add("chicken-attack");[m
[31m-            setTimeout(function() {[m
[31m-                chicken.classList.remove("chicken-attack");[m
[31m-            }, 500);[m
[31m-            [m
[31m-            // Calculate damage based on level and equipment[m
[31m-            var baseDamage = Math.floor(Math.random() * 16) + 5;[m
[31m-            var damageMultiplier = chickenStrength;[m
[31m-            [m
[31m-            // Reduce damage if has repellent[m
[31m-            if (hasRepellent) {[m
[31m-                damageMultiplier *= 0.5;[m
[31m-            }[m
[31m-            [m
[31m-            var damage = Math.floor(baseDamage * damageMultiplier);[m
[31m-            health -= damage;[m
[31m-            [m
[31m-            // Play hit sound[m
[31m-            playHitSound();[m
[31m-            [m
[31m-            // Add screen shake effect[m
[31m-            var gameScreen = document.getElementById("game-screen");[m
[31m-            gameScreen.classList.add("shake");[m
[31m-            setTimeout(function() {[m
[31m-                gameScreen.classList.remove("shake");[m
[31m-            }, 500);[m
[31m-            [m
[31m-            // Generate message with variety[m
[31m-            var attackTypes = ["pecked", "scratched", "charged at", "flapped angrily at", "headbutted"];[m
[31m-            var attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];[m
[31m-            [m
[31m-            var message = "The chicken " + attackType + " you for " + damage + " damage!";[m
[31m-            [m
[31m-            // Random banana chance with messages[m
[31m-            var bananaChance = hasFeather ? 0.5 : 0.3;[m
[31m-            if (Math.random() < bananaChance) {[m
[31m-                var bananaFound = Math.floor(Math.random() * 2) + 1;[m
[31m-                bananas += bananaFound;[m
[31m-                playCollectSound();[m
[31m-                [m
[31m-                var bananaMessages = [[m
[31m-                    " You found " + bananaFound + " magic banana" + (bananaFound > 1 ? "s" : "") + "!",[m
[31m-                    " Look! " + bananaFound + " banana" + (bananaFound > 1 ? "s" : "") + " appeared from nowhere!",[m
[31m-                    " The chicken dropped " + bananaFound + " banana" + (bananaFound > 1 ? "s" : "") + "!"[m
[31m-                ];[m
[31m-                message += bananaMessages[Math.floor(Math.random() * bananaMessages.length)];[m
[31m-            }[m
[31m-            [m
[31m-            // Increase score[m
[31m-            score += 10;[m
[31m-            [m
[31m-            document.getElementById("gameText").textContent = message;[m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Search for bananas[m
[31m-        function searchBananas() {[m
[31m-            // More bananas at higher levels[m
[31m-            var baseBananas = Math.floor(Math.random() * 3) + 1;[m
[31m-            var found = baseBananas + Math.floor(level / 3);[m
[31m-            [m
[31m-            if (hasFeather) {[m
[31m-                found = Math.floor(found * 1.5);[m
[31m-            }[m
[31m-            [m
[31m-            bananas += found;[m
[31m-            playCollectSound();[m
[31m-            [m
[31m-            var messages = [[m
[31m-                "You found " + found + " bananas!",[m
[31m-                "Success! You discovered " + found + " delicious bananas!",[m
[31m-                "Your search revealed " + found + " bananas hiding nearby!"[m
[31m-            ];[m
[31m-            [m
[31m-            var message = messages[Math.floor(Math.random() * messages.length)];[m
[31m-            document.getElementById("gameText").textContent = message;[m
[31m-            [m
[31m-            // Increase score[m
[31m-            score += 5;[m
[31m-            [m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Dance to recover health[m
[31m-        function dance() {[m
[31m-            var gain = Math.floor(Math.random() * 10) + 5;[m
[31m-            [m
[31m-            health += gain;[m
[31m-            if (health > maxHealth) {[m
[31m-                health = maxHealth;[m
[31m-            }[m
[31m-            [m
[31m-            var danceStyles = ["funky", "silly", "graceful", "energetic", "wild"];[m
[31m-            var danceStyle = danceStyles[Math.floor(Math.random() * danceStyles.length)];[m
[31m-            [m
[31m-            var message = "You performed a " + danceStyle + " dance and gained " + gain + " health!";[m
[31m-            [m
[31m-            // Small chance to find a banana while dancing[m
[31m-            if (Math.random() < 0.2) {[m
[31m-                bananas += 1;[m
[31m-                message += " A chicken watched your dance and gave you a banana!";[m
[31m-                playCollectSound();[m
[31m-            }[m
[31m-            [m
[31m-            document.getElementById("gameText").textContent = message;[m
[31m-            [m
[31m-            // Increase score[m
[31m-            score += 3;[m
[31m-            [m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Use potion[m
[31m-        function usePotion() {[m
[31m-            if (potions > 0) {[m
[31m-                var gain = Math.floor(Math.random() * 20) + 10;[m
[31m-                health += gain;[m
[31m-                if (health > maxHealth) {[m
[31m-                    health = maxHealth;[m
[31m-                }[m
[31m-                potions--;[m
[31m-                [m
[31m-                playCollectSound();[m
[31m-                [m
[31m-                document.getElementById("gameText").textContent = "You used a potion and gained " + gain + " health!";[m
[31m-                [m
[31m-                // Increase score[m
[31m-                score += 2;[m
[31m-            } else {[m
[31m-                document.getElementById("gameText").textContent = "No potions left! Visit the shop to buy more.";[m
[31m-            }[m
[31m-            [m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Shop functions[m
[31m-        function showShop() {[m
[31m-            document.getElementById("game-screen").classList.remove("active-screen");[m
[31m-            document.getElementById("shop-screen").classList.add("active-screen");[m
[31m-        }[m
[31m-        [m
[31m-        function hideShop() {[m
[31m-            document.getElementById("shop-screen").classList.remove("active-screen");[m
[31m-            document.getElementById("game-screen").classList.add("active-screen");[m
[31m-        }[m
[31m-        [m
[31m-        function buyItem(item) {[m
[31m-            var cost = 0;[m
[31m-            var message = "";[m
[31m-            [m
[31m-            switch(item) {[m
[31m-                case 'potion':[m
[31m-                    cost = 25;[m
[31m-                    if (bananas >= cost) {[m
[31m-                        bananas -= cost;[m
[31m-                        potions += 1;[m
[31m-                        message = "You bought a health potion!";[m
[31m-                        playCollectSound();[m
[31m-                    } else {[m
[31m-                        message = "Not enough bananas!";[m
[31m-                    }[m
[31m-                    break;[m
[31m-                    [m
[31m-                case 'health':[m
[31m-                    cost = 30;[m
[31m-                    if (bananas >= cost) {[m
[31m-                        bananas -= cost;[m
[31m-                        maxHealth += 20;[m
[31m-                        health += 20;[m
[31m-                        message = "You increased your maximum health by 20!";[m
[31m-                        playCollectSound();[m
[31m-                    } else {[m
[31m-                        message = "Not enough bananas!";[m
[31m-                    }[m
[31m-                    break;[m
[31m-                    [m
[31m-                case 'repellent':[m
[31m-                    cost = 50;[m
[31m-                    if (bananas >= cost) {[m
[31m-                        bananas -= cost;[m
[31m-                        hasRepellent = true;[m
[31m-                        message = "You bought chicken repellent! Chickens now do less damage.";[m
[31m-                        playCollectSound();[m
[31m-                    } else {[m
[31m-                        message = "Not enough bananas!";[m
[31m-                    }[m
[31m-                    break;[m
[31m-                    [m
[31m-                case 'feather':[m
[31m-                    cost = 75;[m
[31m-                    if (bananas >= cost) {[m
[31m-                        bananas -= cost;[m
[31m-                        hasFeather = true;[m
[31m-                        message = "You bought a golden feather! You'll find more bananas now.";[m
[31m-                        playCollectSound();[m
[31m-                    } else {[m
[31m-                        message = "Not enough bananas!";[m
[31m-                    }[m
[31m-                    break;[m
[31m-            }[m
[31m-            [m
[31m-            document.getElementById("gameText").textContent = message;[m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Level up function[m
[31m-        function levelUp() {[m
[31m-            level++;[m
[31m-            chickenStrength = 1 + (level * 0.2);[m
[31m-            [m
[31m-            // Heal player on level up[m
[31m-            health = maxHealth;[m
[31m-            [m
[31m-            // Play level up sound[m
[31m-            playLevelUpSound();[m
[31m-            [m
[31m-            // Show level up message[m
[31m-            document.getElementById("gameText").textContent = "Level Up! You are now level " + level + ". Chickens are getting stronger!";[m
[31m-            [m
[31m-            // Add screen shake effect[m
[31m-            var gameScreen = document.getElementById("game-screen");[m
[31m-            gameScreen.classList.add("shake");[m
[31m-            setTimeout(function() {[m
[31m-                gameScreen.classList.remove("shake");[m
[31m-            }, 500);[m
[31m-            [m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Game over function[m
[31m-        function gameOver() {[m
[31m-            document.getElementById("gameText").textContent = "Game Over! You reached level " + level + " with a score of " + score + ". Refresh the page to play again.";[m
[31m-            [m
[31m-            // Disable buttons[m
[31m-            var buttons = document.querySelectorAll(".game-btn");[m
[31m-            for (var i = 0; i < buttons.length; i++) {[m
[31m-                buttons[i].disabled = true;[m
[31m-                buttons[i].style.opacity = 0.5;[m
[31m-            }[m
[31m-        }[m
[31m-    </script>[m
[31m-</body>[m
[31m-</html>[m
[1mdiff --git a/chicken/index.html b/chicken/index.html[m
[1mindex 7a46d17..9fc5cad 100644[m
[1m--- a/chicken/index.html[m
[1m+++ b/chicken/index.html[m
[36m@@ -1,535 +1 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html lang="en">[m
[31m-<head>[m
[31m-    <meta charset="UTF-8">[m
[31m-    <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <title>Epic Chicken Adventure</title>[m
[31m-    <style>[m
[31m-        /* Integrated CSS from style.css */[m
[31m-        :root {[m
[31m-            --dark-gray: #161616;[m
[31m-            --green: #346751;[m
[31m-            --red: #C84B31;[m
[31m-            --beige: #ECDBBA;[m
[31m-            --yellow: #FFD700;[m
[31m-        }[m
[31m-        body {[m
[31m-            font-family: 'Arial', sans-serif;[m
[31m-            background-color: var(--dark-gray);[m
[31m-            color: var(--beige);[m
[31m-            margin: 0;[m
[31m-            padding: 0;[m
[31m-        }[m
[31m-        .hero {[m
[31m-            min-height: 100vh;[m
[31m-            display: flex;[m
[31m-            align-items: center;[m
[31m-            justify-content: center;[m
[31m-            flex-direction: column;[m
[31m-            padding: 20px;[m
[31m-        }[m
[31m-        .typewriter {[m
[31m-            color: var(--red);[m
[31m-            font-size: 2rem;[m
[31m-        }[m
[31m-        #gameText {[m
[31m-            margin: 20px;[m
[31m-            padding: 20px;[m
[31m-            background-color: var(--green);[m
[31m-            border-radius: 10px;[m
[31m-            color: var(--beige);[m
[31m-            min-height: 80px;[m
[31m-            text-align: center;[m
[31m-            width: 80%;[m
[31m-            max-width: 600px;[m
[31m-        }[m
[31m-        .game-btn {[m
[31m-            margin: 8px;[m
[31m-            padding: 12px 20px;[m
[31m-            background-color: var(--red);[m
[31m-            color: var(--beige);[m
[31m-            border: none;[m
[31m-            border-radius: 8px;[m
[31m-            cursor: pointer;[m
[31m-            font-size: 16px;[m
[31m-            transition: transform 0.2s, background-color 0.2s;[m
[31m-        }[m
[31m-        .game-btn:hover {[m
[31m-            transform: scale(1.05);[m
[31m-            background-color: #e05a3f;[m
[31m-        }[m
[31m-        .game-btn:active {[m
[31m-            transform: scale(0.98);[m
[31m-        }[m
[31m-        #stats {[m
[31m-            display: flex;[m
[31m-            justify-content: space-between;[m
[31m-            width: 80%;[m
[31m-            max-width: 600px;[m
[31m-            background-color: rgba(52, 103, 81, 0.7);[m
[31m-            padding: 15px;[m
[31m-            border-radius: 10px;[m
[31m-            margin-bottom: 20px;[m
[31m-        }[m
[31m-        .stat {[m
[31m-            display: flex;[m
[31m-            flex-direction: column;[m
[31m-            align-items: center;[m
[31m-        }[m
[31m-        .stat-value {[m
[31m-            font-size: 24px;[m
[31m-            font-weight: bold;[m
[31m-            color: var(--beige);[m
[31m-        }[m
[31m-        .stat-label {[m
[31m-            font-size: 14px;[m
[31m-            color: var(--beige);[m
[31m-            opacity: 0.8;[m
[31m-        }[m
[31m-        #chicken-container {[m
[31m-            position: relative;[m
[31m-            height: 200px;[m
[31m-            width: 200px;[m
[31m-            margin: 20px 0;[m
[31m-        }[m
[31m-        #chicken {[m
[31m-            position: absolute;[m
[31m-            height: 150px;[m
[31m-            width: 150px;[m
[31m-            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="40" r="30" fill="%23f5f0e1"/><circle cx="42" cy="34" r="3" fill="%23000"/><circle cx="58" cy="34" r="3" fill="%23000"/><path d="M50 50 L40 60 L50 55 L60 60 Z" fill="%23FF6B35"/><circle cx="50" cy="80" r="18" fill="%23f5f0e1"/></svg>');[m
[31m-            background-repeat: no-repeat;[m
[31m-            background-position: center;[m
[31m-            transition: transform 0.3s;[m
[31m-        }[m
[31m-        .chicken-attack {[m
[31m-            animation: attackAnim 0.5s ease-in-out;[m
[31m-        }[m
[31m-        .shop-item {[m
[31m-            display: flex;[m
[31m-            justify-content: space-between;[m
[31m-            align-items: center;[m
[31m-            padding: 10px;[m
[31m-            margin: 5px 0;[m
[31m-            background-color: rgba(52, 103, 81, 0.5);[m
[31m-            border-radius: 5px;[m
[31m-        }[m
[31m-        .shop-btn {[m
[31m-            background-color: var(--yellow);[m
[31m-            color: var(--dark-gray);[m
[31m-            border: none;[m
[31m-            border-radius: 5px;[m
[31m-            padding: 5px 10px;[m
[31m-            cursor: pointer;[m
[31m-        }[m
[31m-        .shake {[m
[31m-            animation: shake 0.5s;[m
[31m-        }[m
[31m-        .level-indicator {[m
[31m-            position: absolute;[m
[31m-            top: 10px;[m
[31m-            right: 10px;[m
[31m-            background-color: var(--red);[m
[31m-            padding: 5px 10px;[m
[31m-            border-radius: 20px;[m
[31m-            font-weight: bold;[m
[31m-        }[m
[31m-        #screen-container {[m
[31m-            width: 100%;[m
[31m-            max-width: 800px;[m
[31m-        }[m
[31m-        .screen {[m
[31m-            display: none;[m
[31m-            flex-direction: column;[m
[31m-            align-items: center;[m
[31m-            width: 100%;[m
[31m-        }[m
[31m-        .active-screen {[m
[31m-            display: flex;[m
[31m-        }[m
[31m-        @keyframes attackAnim {[m
[31m-            0% { transform: translateY(0) scale(1); }[m
[31m-            50% { transform: translateY(-50px) scale(1.2); }[m
[31m-            100% { transform: translateY(0) scale(1); }[m
[31m-        }[m
[31m-        @keyframes shake {[m
[31m-            0% { transform: translateX(0); }[m
[31m-            25% { transform: translateX(-10px); }[m
[31m-            50% { transform: translateX(10px); }[m
[31m-            75% { transform: translateX(-10px); }[m
[31m-            100% { transform: translateX(0); }[m
[31m-        }[m
[31m-    </style>[m
[31m-</head>[m
[31m-<body>[m
[31m-    <div class="hero">[m
[31m-        <h1>Epic Chicken Adventure</h1>[m
[31m-        <div class="level-indicator">Level: <span id="level-display">1</span></div>[m
[31m-        [m
[31m-        <div id="stats">[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="health-value">100</div>[m
[31m-                <div class="stat-label">❤️ Health</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="score-value">0</div>[m
[31m-                <div class="stat-label">🏆 Score</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="bananas-value">0</div>[m
[31m-                <div class="stat-label">🍌 Bananas</div>[m
[31m-            </div>[m
[31m-            <div class="stat">[m
[31m-                <div class="stat-value" id="potions-value">2</div>[m
[31m-                <div class="stat-label">💊 Potions</div>[m
[31m-            </div>[m
[31m-        </div>[m
[31m-        [m
[31m-        <div id="screen-container">[m
[31m-            <div id="game-screen" class="screen active-screen">[m
[31m-                <div id="chicken-container">[m
[31m-                    <div id="chicken"></div>[m
[31m-                </div>[m
[31m-                <div id="gameText">Welcome to Epic Chicken Adventure! Fight chickens, collect bananas, and become the Chicken Master!</div>[m
[31m-                <div>[m
[31m-                    <button class="game-btn" onclick="fightChicken()">🐔 Fight Chicken</button>[m
[31m-                    <button class="game-btn" onclick="searchBananas()">🔍 Search Bananas</button>[m
[31m-                    <button class="game-btn" onclick="dance()">🧦 Dance</button>[m
[31m-                    <button class="game-btn" onclick="usePotion()">💊 Use Potion</button>[m
[31m-                    <button class="game-btn" onclick="showShop()">🛒 Shop</button>[m
[31m-                </div>[m
[31m-            </div>[m
[31m-            [m
[31m-            <div id="shop-screen" class="screen">[m
[31m-                <h2>Banana Shop</h2>[m
[31m-                <div id="gameText">Spend your bananas on powerful upgrades!</div>[m
[31m-                <div style="width: 100%; max-width: 500px;">[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Health Potion (25 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('potion')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Extra Health (30 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('health')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Chicken Repellent (50 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('repellent')">Buy</button>[m
[31m-                    </div>[m
[31m-                    <div class="shop-item">[m
[31m-                        <span>Golden Feather (75 🍌)</span>[m
[31m-                        <button class="shop-btn" onclick="buyItem('feather')">Buy</button>[m
[31m-                    </div>[m
[31m-                </div>[m
[31m-                <button class="game-btn" onclick="hideShop()">Return to Game</button>[m
[31m-            </div>[m
[31m-        </div>[m
[31m-    </div>[m
[31m-[m
[31m-    <script>[m
[31m-        // Global game state[m
[31m-        var health = 100;[m
[31m-        var maxHealth = 100;[m
[31m-        var bananas = 0;[m
[31m-        var potions = 2;[m
[31m-        var score = 0;[m
[31m-        var level = 1;[m
[31m-        var chickenStrength = 1;[m
[31m-        var hasRepellent = false;[m
[31m-        var hasFeather = false;[m
[31m-        [m
[31m-        // Simple sound functions - no large base64 encoded data[m
[31m-        function playHitSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        function playCollectSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        function playLevelUpSound() {[m
[31m-            try {[m
[31m-                new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YQYAAAAAAAAAAA==").play();[m
[31m-            } catch (e) {[m
[31m-                console.log("Sound failed to play");[m
[31m-            }[m
[31m-        }[m
[31m-[m
[31m-        // Initialize game[m
[31m-        window.onload = function() {[m
[31m-            updateStats();[m
[31m-        };[m
[31m-[m
[31m-        // Update stats display[m
[31m-        function updateStats() {[m
[31m-            document.getElementById("health-value").textContent = health;[m
[31m-            document.getElementById("bananas-value").textContent = bananas;[m
[31m-            document.getElementById("potions-value").textContent = potions;[m
[31m-            document.getElementById("score-value").textContent = score;[m
[31m-            document.getElementById("level-display").textContent = level;[m
[31m-            [m
[31m-            // Check for level up[m
[31m-            if (score >= level * 100) {[m
[31m-                levelUp();[m
[31m-            }[m
[31m-            [m
[31m-            // Check for game over[m
[31m-            if (health <= 0) {[m
[31m-                gameOver();[m
[31m-            }[m
[31m-        }[m
[31m-        [m
[31m-        // Chicken fight with variety[m
[31m-        function fightChicken() {[m
[31m-            // Animate chicken[m
[31m-            var chicken = document.getElementById("chicken");[m
[31m-            chicken.classList.add("chicken-attack");[m
[31m-            setTimeout(function() {[m
[31m-                chicken.classList.remove("chicken-attack");[m
[31m-            }, 500);[m
[31m-            [m
[31m-            // Calculate damage based on level and equipment[m
[31m-            var baseDamage = Math.floor(Math.random() * 16) + 5;[m
[31m-            var damageMultiplier = chickenStrength;[m
[31m-            [m
[31m-            // Reduce damage if has repellent[m
[31m-            if (hasRepellent) {[m
[31m-                damageMultiplier *= 0.5;[m
[31m-            }[m
[31m-            [m
[31m-            var damage = Math.floor(baseDamage * damageMultiplier);[m
[31m-            health -= damage;[m
[31m-            [m
[31m-            // Play hit sound[m
[31m-            playHitSound();[m
[31m-            [m
[31m-            // Add screen shake effect[m
[31m-            var gameScreen = document.getElementById("game-screen");[m
[31m-            gameScreen.classList.add("shake");[m
[31m-            setTimeout(function() {[m
[31m-                gameScreen.classList.remove("shake");[m
[31m-            }, 500);[m
[31m-            [m
[31m-            // Generate message with variety[m
[31m-            var attackTypes = ["pecked", "scratched", "charged at", "flapped angrily at", "headbutted"];[m
[31m-            var attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];[m
[31m-            [m
[31m-            var message = "The chicken " + attackType + " you for " + damage + " damage!";[m
[31m-            [m
[31m-            // Random banana chance with messages[m
[31m-            var bananaChance = hasFeather ? 0.5 : 0.3;[m
[31m-            if (Math.random() < bananaChance) {[m
[31m-                var bananaFound = Math.floor(Math.random() * 2) + 1;[m
[31m-                bananas += bananaFound;[m
[31m-                playCollectSound();[m
[31m-                [m
[31m-                var bananaMessages = [[m
[31m-                    " You found " + bananaFound + " magic banana" + (bananaFound > 1 ? "s" : "") + "!",[m
[31m-                    " Look! " + bananaFound + " banana" + (bananaFound > 1 ? "s" : "") + " appeared from nowhere!",[m
[31m-                    " The chicken dropped " + bananaFound + " banana" + (bananaFound > 1 ? "s" : "") + "!"[m
[31m-                ];[m
[31m-                message += bananaMessages[Math.floor(Math.random() * bananaMessages.length)];[m
[31m-            }[m
[31m-            [m
[31m-            // Increase score[m
[31m-            score += 10;[m
[31m-            [m
[31m-            document.getElementById("gameText").textContent = message;[m
[31m-            updateStats();[m
[31m-        }[m
[31m-        [m
[31m-        // Search for bananas[m
[31m-        function searchBananas() {[m
[31m-            // More bananas at higher levels[m
[31m-            var baseBananas = Math.floor(Math.random() * 3) + 1;[m
[31m-            var found = baseBananas + Math.floor(level / 3);[m
[31m-            [m
[31m-            if (hasFeather) {[m
[31m-                found = Math.floor(found * 1.5);[m
[31m-            }[m
[31m-            [m
[31m-            bananas += found;[m
[31m-            playCollectSound();[m
[31m-            [m
[31m-            var messages = [[m
[31m-                "You found " + found + " bananas!",[m
[31m-                "Success! You discovered " + found + " delicious ban