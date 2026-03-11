AllRouter.AI est une passerelle unifiée de modèles IA, conçue pour vous offrir un accès pratique, efficace et économique aux modèles d'IA. Ce guide, rédigé du point de vue d'un utilisateur final, vous aide à maîtriser rapidement les fonctionnalités clés et les flux d'utilisation de la plateforme.

# Vue d'ensemble de la plateforme

AllRouter.AI intègre plus de 50 modèles de référence, notamment OpenAI, Claude et Llama. Grâce à une API unifiée, vous pouvez exploiter l'ensemble des capacités IA sans changer de plateforme.

Atouts principaux :

Remplacement transparent : compatible à 100 % avec le SDK OpenAI. Il suffit de modifier `base_url`.

Routage intelligent : sélection automatique de modèles moins coûteux ou plus rapides selon vos règles.

Haute disponibilité : bascule automatique en cas de panne pour assurer la continuité du service.

Observabilité en temps réel : la console affiche en détail la latence, la consommation de tokens et les coûts.

# Démarrage rapide

## Inscription et connexion

### Inscription

Accédez à https://allrouter.shengjian.net/, cliquez sur **Connexion** -> **Inscription**, saisissez votre nom d'utilisateur et votre mot de passe dans la fenêtre, puis cliquez sur **Inscription** pour créer votre compte.

![](/docs_images/img_2.png)

![](/docs_images/img_3.png)

### Connexion

Accédez à https://allrouter.shengjian.net/, cliquez sur **Connexion**, saisissez votre nom d'utilisateur et votre mot de passe, puis cliquez sur **Continuer** pour vous connecter à AllRouter.AI.

![](/docs_images/img_4.png)

## Playground

Description : testez et utilisez différents modèles IA directement dans le navigateur, sans écrire de code.

1. Étape 1 : cliquez sur **Playground** dans le menu de gauche.

2. Étape 2 : dans le panneau **Configuration du modèle**, choisissez un modèle cible dans la liste **Modèle** (par exemple `gpt4o`).

3. Étape 3 : (optionnel) ajustez le curseur **Temperature** pour contrôler la créativité.

4. Étape 4 : saisissez votre demande dans la zone de saisie en bas de la zone de conversation à droite.

5. Étape 5 : cliquez sur **Envoyer** à droite du champ.

Prérequis : votre solde de compte doit être supérieur à 0.

Résultat attendu : l'IA répond immédiatement et les détails de consommation s'affichent en bas.

![](/docs_images/img_5.png)

## Console

### Tableau de bord

Après connexion, la première page affichée est le tableau de bord. Il présente de manière claire l'état de votre compte :

Solde actuel : consultation en temps réel du crédit restant.

Statistiques d'utilisation : nombre de requêtes, crédit consommé et tokens consommés.

Consommation des ressources : total du crédit consommé et total des tokens consommés.

Indicateurs : TPM moyen et RPM moyen.

Analyse des modèles : graphiques de répartition de consommation et de tendance par modèle.

![](/docs_images/img_6.png)

### Gestion des tokens

Description : gérez les clés d'appel API (tokens), avec limites de quota et date d'expiration.

Pour commencer les appels API, vous devez créer un token :

1. Étape 1 : cliquez sur **Gestion des tokens** dans le menu de gauche.

2. Étape 2 : cliquez sur **Ajouter un token**.

3. Étape 3 : définissez le nom, la limite de quota, l'expiration et les restrictions d'accès.

4. Étape 4 : après création, copiez la clé générée et utilisez-la dans votre application.

![](/docs_images/img_7.png)

### Journaux d'utilisation

Description : enregistre tous les appels API effectués via la passerelle AllRouter.AI pour l'audit et l'analyse des coûts.

1. Étape 1 : cliquez sur **Journaux d'utilisation** dans le menu de gauche pour afficher la liste des appels.

2. Étape 2 : définissez la période de recherche via le sélecteur de date (**début** et **fin**).

3. Étape 3 : renseignez des filtres dans **Nom du token**, **Nom du modèle**, **Groupe** ou **Request ID**.

4. Étape 4 : lancez la recherche en cliquant sur **Rechercher**.

5. Étape 5 : consultez les détails (**Heure**, **Token**, **Modèle**, **Coût**, etc.) puis cliquez sur **Détails** pour voir la requête/réponse complète.

![](/docs_images/img_8.png)

### Journaux d'image

Description : enregistre l'exécution des tâches de génération d'images (par ex. Midjourney), avec état, progression et résultats.

1. Étape 1 : cliquez sur **Journaux d'image** dans le menu de gauche.

2. Étape 2 : recherchez une tâche via **Task ID**, choisissez une période, puis cliquez sur **Rechercher**.

3. Étape 3 : cliquez sur les vignettes de la colonne **Image de résultat** pour visualiser le rendu.

4. Étape 4 : vérifiez l'état ; en cas d'échec, consultez **Raison de l'échec**.

![](/docs_images/img_9.png)

### Journaux de tâches

Description : enregistre le cycle de vie des tâches asynchrones du système (traitements batch, tâches longues, etc.).

1. Étape 1 : cliquez sur **Journaux de tâches** dans le menu de gauche.

2. Étape 2 : filtrez via **Task ID** ou une plage de temps, puis cliquez sur **Rechercher**.

3. Étape 3 : analysez le temps de traitement en comparant **Heure de soumission** et **Heure de fin**.

4. Étape 4 : personnalisez les colonnes affichées via **Paramètres de colonnes** en haut à droite.

![](/docs_images/img_10.png)

## Espace personnel

### Gestion du portefeuille

Description : gérez votre solde, avec prise en charge de plusieurs moyens de paiement et du programme de parrainage.

1. Étape 1 : cliquez sur **Gestion du portefeuille** dans le menu de gauche.

2. Étape 2 : saisissez le montant (USD) dans **Montant de recharge**.

3. Étape 3 : choisissez le mode de paiement (**WeChat** ou **Stripe**).

4. Étape 4 : sélectionnez un palier dans **Sélection du montant**, ou cliquez directement sur **Payer**.

5. Étape 5 : finalisez le paiement via QR code ou via la passerelle de paiement.

Prérequis : disposer d'un moyen de paiement valide.

Résultat attendu : le **Solde actuel** se met à jour en temps réel après paiement.

![](/docs_images/img_11.png)

### Paramètres personnels

Description : liaison de compte, sécurité, alertes de quota et préférences d'interface.

![](/docs_images/img_12.png)

#### Liaison de compte

Description : choisissez et gérez les comptes sociaux liés à votre compte.

![](/docs_images/img_13.png)

#### Paramètres de sécurité

Description : configurez token d'accès, gestion du mot de passe, connexion Passkey et vérification en deux étapes.

![](/docs_images/img_14.png)

#### Préférences

Description : langue de l'interface et autres préférences personnelles.

![](/docs_images/img_15.png)

#### Paramètres de notification

Description : paramètres liés aux notifications, au prix et à la confidentialité.

1. Étape 1 : cliquez sur **Paramètres personnels** dans le menu de gauche.

2. Étape 2 : ouvrez l'onglet **Paramètres de notification**.

3. Étape 3 : définissez le seuil dans **Seuil d'alerte de quota**.

4. Étape 4 : choisissez le **Mode de notification** (par ex. e-mail).

5. Étape 5 : cliquez sur **Enregistrer**.

Résultat attendu : lorsque le solde est faible, le système envoie automatiquement des alertes via le canal choisi.

![](/docs_images/img_16.png)

#### Paramètres de prix

Si un modèle n'a pas de prix configuré, les appels peuvent être acceptés malgré tout. Utilisez cette option uniquement si vous faites confiance au site, car des coûts élevés peuvent survenir.

![](/docs_images/img_17.png)

#### Paramètres de confidentialité

Une fois activé, seules les journaux de **consommation** et d'**erreur** enregistrent l'adresse IP du client.

![](/docs_images/img_18.png)

#### Paramètres de barre latérale

![](/docs_images/img_19.png)

# Catalogue des modèles

Description : le **Catalogue des modèles** est la base centrale d'AllRouter.AI. Il affiche tous les modèles pris en charge et fournit une tarification transparente en temps réel. Vous pouvez évaluer précisément le coût de chaque modèle selon le multiplicateur officiel ou votre coût réel après recharge.

1. Étape 1 : cliquez sur **Catalogue des modèles** dans la barre de navigation supérieure. La vue carte affiche par défaut l'ID du modèle et le prix pour 1M tokens.

2. Étape 2 : comprenez les deux modes de facturation.

* Facturation au token : pour les modèles de dialogue, selon les tokens d'entrée, de génération et de lecture cache.
* Facturation à la requête : pour certains modèles (image, tâches), coût fixe par appel.

3. Étape 3 : basculez l'affichage des prix.

* Affichage prix après recharge : convertit automatiquement le coût réel selon votre ratio de recharge.
* Affichage multiplicateur : affiche le multiplicateur de facturation par rapport au prix officiel.

4. Étape 4 : localisez précisément les modèles via la barre latérale. Sélectionnez un fournisseur ou **Facturation au token**.

5. Étape 5 : recherchez et copiez l'ID de modèle via la barre de recherche puis l'icône **Copier** sur la carte.

6. Étape 6 : opérations groupées et changement de vue.

* Vue tableau : cliquez sur **Vue tableau** en haut à droite pour comparer plusieurs modèles de manière compacte.
* Résultat attendu : améliore fortement l'efficacité de configuration en environnement multi-modèles.

![](/docs_images/img_20.png)

# Exemple d'utilisation

Exemple : utilisation d'AllRouter avec Claude Code.

## Étape 1 : installer Claude Code

Prérequis :

* Installer [Node.js 18 ou version ultérieure](https://nodejs.org/en/download/).
* Sous macOS, il est recommandé d'installer Node.js via [nvm](https://github.com/nvm-sh/nvm) ou [Homebrew](https://formulae.brew.sh/formula/node).
* Sous Windows, installer aussi [Git for Windows](https://git-scm.com/download/win).

Dans le terminal :

npm install -g @anthropic-ai/claude-code

Vérifiez l'installation :

claude --version

## Étape 2 : configurer AllRouter

1. Étape 1 : créer un compte

Accédez à la plateforme AllRouter, cliquez sur **Inscription/Connexion** en haut à droite et suivez les instructions.

2. Étape 2 : obtenir une clé API

Après connexion, allez dans l'espace personnel, cliquez sur **API Keys** et créez une nouvelle clé.

Pour appeler l'API, créez d'abord un token sur AllRouter :

* (1) Ouvrez **Gestion des tokens**.
* (2) Cliquez sur **Ajouter un token**.
* (3) Configurez nom, quota, expiration et restrictions.
* (4) Copiez la clé générée.

![](/docs_images/img_21.png)

Copiez les informations API Keys.

![](/docs_images/img_22.png)

3. Étape 3 : configurer les variables d'environnement

Configuration manuelle sur macOS, Linux ou Windows.

Les chemins de fichiers de configuration diffèrent selon le système ; vérifiez que le JSON reste valide.

```bash
# Éditer ou créer `settings.json`
# macOS & Linux : `~/.claude/settings.json`
# Windows : `<répertoire-utilisateur>/.claude/settings.json`
# Ajouter ou modifier le champ `env`
# Remplacer `your_allrouter_api_key` par la clé API obtenue précédemment
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_allrouter_api_key",
    "ANTHROPIC_BASE_URL": "https://allrouter.shengjian.net/v1",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

```bash
# Puis éditer ou créer `.claude.json`
# macOS & Linux : `~/.claude.json`
# Windows : `<répertoire-utilisateur>/.claude.json`
# Ajouter `hasCompletedOnboarding`
```

```json
{
  "hasCompletedOnboarding": true
}
```

Résultat de configuration :

```env
ANTHROPIC_AUTH_TOKEN=Clé API du token
ANTHROPIC_BASE_URL=https://allrouter.shengjian.net/v1
ANTHROPIC_MODEL=Nom du token
```

![](/docs_images/img_23.png)

## Étape 3 : commencer avec Claude Code

Après configuration, ouvrez votre dossier de projet et exécutez `claude` dans le terminal.

Si le message **Do you want to use this API key** apparaît, choisissez **Yes**.

![](/docs_images/img_24.png)
