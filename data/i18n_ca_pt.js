/* i18n_ca_pt.js — Português europeu (European Portuguese) pack for the CATALAN (ca)
   course: course-flavoured UI overrides + full content translations. Catalan (`ca`)
   is never translated; only the L1-facing text. Uses EP vocabulary throughout
   (obrigado, autocarro, comboio, elétrico, pequeno-almoço, casa de banho, etc.).
   See docs/profiles/ca/pt-ca_contrastive_profile.md. */
(function () {
  "use strict";
  var I = LSV.i18n;

  I.registerUITarget("pt", "ca", {
    hero_hi_t: "Bon dia! Em dic Drac.", hero_hi_s: "Olá! Sou o Drac. Vamos aprender catalão!",
    hero_keep_t: "Molt bé! Continua.",
    hero_done_t: "Felicitats! Conseguiste!",
    audio_tip: "Dica: o áudio usa a voz catalã do teu navegador. Se não ouvires, experimenta o Safari ou o Chrome, ou adiciona as tuas gravações mais tarde.",
    made_with: "Feito com ❤️ para uma viagem a Barcelona",
    culture_title: "Sabies que? 🟨🟥",
    culture_sub: "Sabias que? — tradições catalãs e factos sobre Barcelona",
    welcome_title: "Benvinguts!",
    welcome_sub: "Aprende um pouco de catalão para uma viagem a Barcelona — palavras, frases e curiosidades, um pequeno passo de cada vez.",
    celebrate_t: "Molt bé!"
  });

  var t = function (t, note) { return { t: t, note: note || "" }; };

  I.registerContent("pt", "ca", {
    vocab: {
      // Unit 1
      hola: t("olá", "A saudação para qualquer altura do dia."),
      bon_dia: t("bom dia", "Literalmente 'bom dia' — usa-se toda a manhã."),
      bona_tarda: t("boa tarde", "A partir da 1 da tarde até escurecer."),
      adeu: t("adeus", "O 'adeus' do dia a dia."),
      gracies: t("obrigado(a)", "O 'à' é tónico; termina num 'es' suave."),
      moltes_gracies: t("muito obrigado(a)", "Um agradecimento mais caloroso."),
      de_res: t("de nada", "A resposta a 'gràcies'."),
      si: t("sim", "Com acento, para distinguir de 'si' = se."),
      no: t("não", "Igual ao português no sentido, não no som."),
      perdo: t("desculpe / com licença", "Para pedir desculpa ou passar."),
      perdoni: t("desculpe (formal)", "Para chamar a atenção de um estranho com cortesia."),
      si_us_plau: t("por favor / se faz favor", "Três palavras ditas como uma: 'si-us-plau'."),
      parla_angles: t("Fala inglês?", "A tua frase salva-vidas em Barcelona."),
      no_ho_entenc: t("Não percebo", "'ho' = o/isto; 'entenc' = percebo."),
      em_dic: t("Chamo-me…", "Literalmente 'chamo-me'. Acrescenta o teu nome."),

      // Unit 2
      jo: t("eu", "O 'j' soa como o 'j' francês (como em 'measure')."),
      tu: t("tu", "'Tu' informal — o tratamento amigável por defeito."),
      ell: t("ele", "'ll' soa como o 'lh' português."),
      ella: t("ela", "Mesmo som de 'll' que 'ell'."),
      com_et_dius: t("Como te chamas?", "Responde com 'Em dic…'."),
      mare: t("mãe"),
      pare: t("pai"),
      germana: t("irmã", "'g' antes de 'e' soa como o 'j' francês."),
      germa: t("irmão", "A mesma palavra que 'germana', no masculino."),
      familia: t("família"),
      com_estas: t("Como estás?", "Responde: 'Molt bé, gràcies!'"),
      molt_be: t("muito bem / ótimo", "Também o 'Boa!' do dia a dia."),
      don_ets: t("De onde és?", "'d'on' = de onde."),
      soc_de: t("Sou de…", "Acrescenta a tua cidade: '…Lisboa'."),

      // Unit 3 — numbers
      zero: t("zero"),
      u: t("um", "Para contar; 'un/una' antes de um nome."),
      dos: t("dois", "'dues' com nomes femininos."),
      tres: t("três"),
      quatre: t("quatro"),
      cinc: t("cinco", "O 'c' final soa como 'ng'."),
      sis: t("seis"),
      set: t("sete", "Também significa 'sede'."),
      vuit: t("oito", "O 'v' soa como 'b'."),
      nou: t("nove", "Também significa 'novo'."),
      deu: t("dez"),
      onze: t("onze"),
      dotze: t("doze"),
      tretze: t("treze", "13–16 terminam em '-tze'."),
      catorze: t("catorze"),
      quinze: t("quinze"),
      setze: t("dezasseis", "Atenção: 'setze' = 16, não 17."),
      disset: t("dezassete", "17–19 = 'di-' + 7/8/9."),
      divuit: t("dezoito"),
      dinou: t("dezanove"),
      vint: t("vinte"),
      trenta: t("trinta"),
      quaranta: t("quarenta"),
      cent: t("cem"),
      quant_costa: t("Quanto custa?", "A tua pergunta-chave nas compras."),
      euros: t("euros", "A moeda em Barcelona."),
      car: t("caro", "'cara' com um nome feminino."),
      barat: t("barato", "'barata' com um nome feminino."),
      voldria: t("gostaria", "Forma educada de pedir algo."),
      un: t("um (masc.)", "Antes de nomes masculinos: un cafè."),
      una: t("uma (fem.)", "Antes de nomes femininos: una cervesa."),
      aixo: t("isto", "Aponta e diz isto ao comprar."),

      // Unit 4
      cafe: t("café", "Um 'cafè' simples é um expresso."),
      tallat: t("garoto / pingo", "Expresso com um pouco de leite."),
      cafe_amb_llet: t("café com leite / meia de leite", "'amb' = com; 'llet' = leite."),
      canya: t("imperial / fino", "O copo pequeno de cerveja de pressão."),
      croissant: t("croissant", "Um clássico do café."),
      un_cafe_si_us_plau: t("Um café, por favor", "Um pedido simples no café."),
      per_emportar: t("para levar", "Acrescenta a qualquer pedido para levar."),
      esmorzar: t("pequeno-almoço"),
      dinar: t("almoço", "Normalmente por volta das 14h em Barcelona."),
      sopar: t("jantar", "Muitas vezes às 21h ou mais tarde."),
      aigua: t("água", "Água da torneira é 'aigua de l'aixeta'."),
      vi: t("vinho", "O 'v' soa como 'b'."),
      el_compte: t("a conta", "Pede: 'El compte, si us plau'."),
      bon_profit: t("bom apetite", "O 'bom apetite' catalão."),

      // Unit 5
      metro: t("metro", "A forma rápida de atravessar Barcelona."),
      autobus: t("autocarro"),
      tren: t("comboio", "Os comboios Rodalies vão ao aeroporto e à costa."),
      tramvia: t("elétrico"),
      bitllet: t("bilhete", "Um cartão 'T-casual' dá 10 viagens."),
      on_es: t("Onde é…?", "A seguir, diz o lugar."),
      a: t("a / para", "'a' + 'el' = 'al'."),
      de: t("de", "'de' + 'el' = 'del'."),
      dreta: t("direita", "'a la dreta' = à direita."),
      esquerra: t("esquerda", "'a l'esquerra' = à esquerda."),
      tot_recte: t("sempre em frente"),

      // Unit 6
      barri_gotic: t("o Bairro Gótico", "O centro medieval de Barcelona."),
      sagrada_familia: t("a Sagrada Família", "A basílica de Gaudí — ainda por acabar."),
      museu: t("museu", "O museu Picasso fica no Born."),
      mercat: t("mercado", "La Boqueria é o mais famoso."),
      placa: t("praça", "A Plaça de Catalunya é o coração da cidade."),
      horari: t("horário", "Muitas lojas fecham à hora de almoço."),
      on_es_el_lavabo: t("Onde é a casa de banho?", "'lavabo' = casa de banho."),
      puc_fer_una_foto: t("Posso tirar uma foto?", "É educado perguntar dentro de edifícios ou a pessoas.")
    },

    lessons: {
      l01: "Dizer olá",
      l02: "Obrigado, sim e não",
      l03: "Desculpe e com licença",
      l04: "As tuas primeiras frases",
      l05: "Eu e tu",
      l06: "Família",
      l07: "Conversa de circunstância",
      l08: "Números 0–10",
      l09: "Números 11–100",
      l10: "Falar de compras",
      l11: "Quero isto — un / una",
      l12: "No café e no bar",
      l13: { title: "Pedir num café", fill: "Um café, por favor" },
      l14: "Refeições e bebidas",
      l15: "Deslocar-se",
      l16: { title: "Direções", fill: "Onde é o metro?" },
      l17: "Lugares para ver",
      l18: { title: "Perguntas úteis", fill: "Onde é a casa de banho?" }
    },

    units: {
      u1: "Sobrevivência básica",
      u2: "Conhecer pessoas",
      u3: "Números e compras",
      u4: "Comida e café",
      u5: "Deslocações",
      u6: "Turismo"
    },

    modules: {
      m1: "Saudações", m2: "Ser educado", m3: "Tu e eu", m4: "Conversa",
      m5: "Contar", m6: "Nas compras", m7: "Café e bar", m8: "Refeições",
      m9: "Transportes e direções", m10: "Por Barcelona"
    },

    culture: {
      dos_petons: { title: "Dois beijinhos",
        body: "Os catalães costumam cumprimentar os amigos com <b class='sv-hl'>dos petons</b> — um beijo em cada face, a começar pela tua esquerda. Um <b class='sv-hl'>hola</b> caloroso chega sempre para um visitante." },
      dues_llengues: { title: "O catalão é uma língua própria",
        body: "O <b class='sv-hl'>català</b> não é um dialeto do espanhol — é uma língua românica à parte, cooficial na Catalunha. Toda a gente em Barcelona também fala espanhol, mas tentar um pouco de catalão encanta os locais." },
      sant_jordi: { title: "Rosas e livros",
        body: "A 23 de abril, o <b class='sv-hl'>Sant Jordi</b> (São Jorge) enche as ruas de bancas de rosas e livros. Os namorados trocam uma rosa e um livro — é a resposta romântica da Catalunha ao Dia dos Namorados, ligada à lenda do cavaleiro e do dragão." },
      caga_tio: { title: "O tronco que traz presentes",
        body: "No Natal, as crianças 'alimentam' durante dias um pequeno tronco sorridente, o <b class='sv-hl'>Caga Tió</b>, e depois batem-lhe com paus para ele 'largar' doces e prendinhas. É uma das tradições catalãs mais queridas (e engraçadas)." },
      sant_joan: { title: "Fogueiras na noite mais curta",
        body: "Na noite de 23 de junho, o <b class='sv-hl'>Sant Joan</b> ilumina praias e praças com fogueiras, foguetes e a <b class='sv-hl'>coca</b> — tal como o <i>São João</i> português. Barcelona quase não dorme nessa noite." },
      vermut: { title: "Vamos ao vermute",
        body: "Aos fins de semana, os locais <b class='sv-hl'>fer el vermut</b> — um <b class='sv-hl'>vermut</b> (vermute) antes do almoço, com azeitonas e batatas fritas, de pé ao balcão. Mais do que a bebida, é o ritual de conviver." },
      pa_amb_tomaquet: { title: "O pão catalão de todos os dias",
        body: "O <b class='sv-hl'>pa amb tomàquet</b> é pão esfregado com tomate maduro, azeite e uma pitada de sal. Vem com quase tudo, e os catalães crescem a comê-lo todos os dias — simples e perfeito." },
      calcots: { title: "Cebolas grelhadas com babete",
        body: "No inverno, uma <b class='sv-hl'>calçotada</b> são cebolinhas grelhadas (<b class='sv-hl'>calçots</b>) mergulhadas em molho romesco. Pões um babete, comes com as mãos e fica tudo deliciosamente sujo — um verdadeiro banquete catalão." },
      castellers: { title: "Torres humanas",
        body: "As equipas de <b class='sv-hl'>castellers</b> constroem torres humanas de até dez pessoas de altura, com uma criança no topo. Reconhecido pela UNESCO, um <b class='sv-hl'>castell</b> é trabalho de equipa, coragem e equilíbrio à vista de todos." },
      gaudi: { title: "Gaudí desenhou a cidade",
        body: "O <b class='sv-hl'>modernisme</b> de Antoni Gaudí deu a Barcelona a <b class='sv-hl'>Sagrada Família</b>, o Park Güell e a Casa Batlló. A Sagrada Família começou em 1882 e ainda hoje está a ser terminada." },
      fc_barca: { title: "Mais do que um clube",
        body: "O lema do FC Barcelona é <b class='sv-hl'>més que un club</b> — 'mais do que um clube'. Para muitos catalães, a equipa é um símbolo da identidade da região, não só futebol. Camp Nou é uma peregrinação para os adeptos." },
      la_merce: { title: "A grande festa da cidade",
        body: "Por volta de 24 de setembro, <b class='sv-hl'>La Mercè</b> é a maior festa de Barcelona: castellers, gigantes (<b class='sv-hl'>gegants</b>) e o <b class='sv-hl'>correfoc</b> — uma 'corrida de fogo' de tambores e diabos com fogo de artifício." }
    }
  });
})();
