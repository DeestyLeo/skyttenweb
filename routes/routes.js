const { Router } = require("express");
const { crearDB } = require("megadb");
const router = Router();

router.get("/", async (req, res) => {

    const { getStatus } = require("mc-server-status")
    

    const status = await getStatus("play.skytten.tk");
    let players = status.players.online || '0';
    let maxPlayers = status.players.max || '0';

    let statusping;

    if(players === '0'){
        statusping = 'var(--danger)'
    }else{
        statusping = 'var(--success)'
    }

    let servidor = req.BotClient.guilds.cache.get('931991448159670312')
    let memberCount = servidor.memberCount || '0';

    let members = servidor.members;

    const anunciosDB = require(process.cwd()+'/skyttenDB/anuncios')

    let anunciosArray = [];
    let membersArray = [];

    for(const key in members){
        if(members){
            membersArray.push({
                id: members[key].id,
                username: members[key].name,
                discriminator: members[key].discriminator,
                avatar: members[key].icon,
                verified: members[key].verified,
                email: members[key].email,
                flags: members[key].flags,
                banner: members[key].banner,
                accent_color: members[key].accent_color,
                premium_type: members[key].premium_type,
                public_flags: members[key].public_flags,
            });
        }else{
            membersArray = 'No hay staff online.'
        }
        
    }

    for(const key in anunciosDB){
        const moment = require('moment')

        var Date = anunciosDB[key].date;

        let dife = moment().diff(moment(Date), 'days');
        let hace = dife;
        let sufijo = " dias."
        if(dife >= 7){
            hace = Math.round(dife / 7)
            if(hace = 1){
                sufijo = " semana."
            }
            sufijo = " semanas."
        }
        if(dife >= 30){
            hace = Math.round(dife / 30)
            if(hace = 1){
                sufijo = " mes."
            }
            sufijo = " meses."
        }
        if(dife >= 365){
            hace = Math.round(dife / 365)
            if(hace = 1){
                sufijo = " año."
            }
            sufijo = " años."
        }

        let fecha = "Hace "+hace+sufijo;

        anunciosArray.push({
            title: anunciosDB[key].title,
            author: anunciosDB[key].author,
            date: fecha,
            image: anunciosDB[key].image,
            description: anunciosDB[key].description,
        });
    }
    
    let anuncios = anunciosArray.splice(0, 1);

    res.render('home', {
        title: "Inicio · Skytten",
        players,
        maxPlayers,
        memberCount,
        anuncios,
        membersArray,
        statusping
    });

});

router.get("/anuncios", (req, res) => {

    const anunciosDB = require(process.cwd()+'/skyttenDB/anuncios')

    let anuncios = [];

    for(const key in anunciosDB){
        const moment = require('moment')

        var Date = anunciosDB[key].date;

        let dife = moment().diff(moment(Date), 'days');
        let hace = dife;
        let sufijo = " dias."
        if(dife >= 7){
            hace = Math.round(dife / 7)
            if(hace = 1){
                sufijo = " semana."
            }
            sufijo = " semanas."
        }
        if(dife >= 30){
            hace = Math.round(dife / 30)
            if(hace = 1){
                sufijo = " mes."
            }
            sufijo = " meses."
        }
        if(dife >= 365){
            hace = Math.round(dife / 365)
            if(hace = 1){
                sufijo = " año."
            }
            sufijo = " años."
        }

        let fecha = "Hace "+hace+sufijo;

        anuncios.push({
            title: anunciosDB[key].title,
            author: anunciosDB[key].author,
            date: fecha,
            image: anunciosDB[key].image,
            description: anunciosDB[key].description,
        });
    }

    res.render("anuncios", {
        title: "Anuncios · Skytten",
        anuncios
    });

});

router.get("/staff", (req, res) => {
    res.render('staff', {
        title: 'Staff · Skytten',

    });
});

router.get("/sanciones", (req, res) => {
    res.render('sanciones', {
        title: 'Sanciones · Skytten',

    });
});

router.get('/perfil/:user', async (req, res, next) => {

    const megaDB = require('megadb');
    const perfilesDB = new crearDB('perfiles')

    let params = `${req.params.user}`;
    let user = params.toLowerCase();
    let perfil = [];

    const results = await perfilesDB.obtener(`${user}`);

    if(!results){
        next();
    }else{
        for(const key in results){
            perfil.push({
                banner: results[key].banner,
                roleColor: results[key].roleColor,
    
                discordId: results[key].discord.id,
                discordUsername: results[key].discord.username,
                discordUsertag: results[key].discord.usertag,
                discordAvatar: results[key].discord.avatarURL,
                discordId: results[key].discord.id,
    
                minecraftUsername: results[key].minecraft.username,
                minecraftRole: results[key].minecraft.role,
                minecraftUUID: results[key].minecraft.uuid,
            });
        }
    
        res.render('perfil', {
            title: params+' · Skytten',
            perfil,
        });
        
    }
})

router.get('/terms', (req, res) => {
    res.render('terms', {
        title: 'Términos y Condiciones · Skytten',
    })
})
router.get('/reglas', (req, res) => {
    res.render('reglas', {
        title: 'Reglas · Skytten',
    })
})

router.use('*', (req, res) => {
    res.status(404).render("error", {
        title: '404 · Skytten'
    })
})

module.exports = router;