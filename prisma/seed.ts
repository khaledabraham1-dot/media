import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMGS = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1444653300305-64505342738d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
];

async function main() {
  // Clean existing data
  await prisma.pageView.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.articleTag.deleteMany();
  await prisma.article.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.newsletterSub.deleteMany();

  // Site settings
  await prisma.siteSettings.create({
    data: {
      id: "default",
      siteName: "Ligne Rouge",
      tagline: "L'information qui compte",
      description:
        "Plateforme d'information indépendante. Actualité, Politique, Sport, Société, International, Culture.",
      socialX: "https://twitter.com/lignerouge",
      socialFb: "https://facebook.com/lignerouge",
    },
  });

  // Categories
  const categories = await Promise.all(
    [
      { name: "Actualité", slug: "actualite", color: "#C01D35", order: 1 },
      { name: "Politique", slug: "politique", color: "#1B4F72", order: 2 },
      {
        name: "International",
        slug: "international",
        color: "#6C3483",
        order: 3,
      },
      { name: "Économie", slug: "economie", color: "#1E8449", order: 4 },
      { name: "Technologie", slug: "technologie", color: "#2E86C1", order: 5 },
      { name: "Sport", slug: "sport", color: "#D68910", order: 6 },
      { name: "Société", slug: "societe", color: "#A04000", order: 7 },
      { name: "Culture", slug: "culture", color: "#7D3C98", order: 8 },
    ].map((c) => prisma.category.create({ data: c }))
  );

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  // Tags
  const tags = await Promise.all(
    [
      { name: "Urgent", slug: "urgent" },
      { name: "Analyse", slug: "analyse" },
      { name: "Enquête", slug: "enquete" },
      { name: "Afrique", slug: "afrique" },
      { name: "Europe", slug: "europe" },
      { name: "Tech", slug: "tech" },
      { name: "Football", slug: "football" },
      { name: "Climat", slug: "climat" },
    ].map((t) => prisma.tag.create({ data: t }))
  );

  const tagMap = Object.fromEntries(tags.map((t) => [t.slug, t.id]));

  // Authors
  const admin = await prisma.user.create({
    data: {
      email: "admin@lignerouge.media",
      name: "Admin",
      role: "admin",
      bio: "Administrateur de la plateforme Ligne Rouge.",
      avatar: IMGS[5],
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: "redaction@lignerouge.media",
      name: "Rédaction Ligne Rouge",
      role: "editor",
      bio: "Équipe éditoriale de Ligne Rouge. Journalisme indépendant et rigoureux.",
      avatar: IMGS[5],
    },
  });

  // Articles
  const articlesData = [
    {
      title: "Nouveaux enjeux géopolitiques en Afrique de l'Ouest",
      slug: "nouveaux-enjeux-geopolitiques-afrique-ouest",
      subtitle: "Une analyse profonde des changements récents dans la sous-région.",
      excerpt:
        "L'Afrique de l'Ouest traverse une période de transformation politique majeure qui redéfinit les équilibres régionaux.",
      body: `<p>L'Afrique de l'Ouest traverse une période de transformation politique majeure qui redéfinit les équilibres régionaux et les relations internationales. Les récents changements de gouvernance dans plusieurs pays de la sous-région ont provoqué une reconfiguration profonde des alliances et des dynamiques de pouvoir.</p>

<h2>Un nouveau paysage politique</h2>
<p>La montée en puissance de nouvelles formes de gouvernance dans la région CEDEAO a créé un précédent historique. Les populations, longtemps marginalisées des processus décisionnels, revendiquent désormais un rôle actif dans la définition de leur avenir politique et économique.</p>

<p>Les analystes observent avec attention ces transformations qui pourraient redessiner la carte géopolitique du continent africain pour les décennies à venir. La question de la souveraineté et de l'autodétermination est au cœur de ces mutations.</p>

<h2>Implications internationales</h2>
<p>Ces bouleversements ne sont pas sans conséquences sur la scène internationale. Les puissances traditionnellement influentes dans la région doivent repenser leurs approches diplomatiques et leurs partenariats stratégiques.</p>

<p>La diversification des alliances internationales de la région, notamment vers de nouveaux partenaires émergents, témoigne d'une volonté affirmée d'indépendance géostratégique. Cette dynamique s'inscrit dans un mouvement plus large de réaffirmation de la souveraineté des nations africaines.</p>`,
      coverImage: IMGS[1],
      categorySlug: "politique",
      tagSlugs: ["analyse", "afrique"],
      featured: true,
      breaking: true,
      readTime: 6,
      views: 12450,
    },
    {
      title: "Lions de la Téranga : Préparatifs pour la Coupe du Monde",
      slug: "lions-teranga-preparatifs-coupe-monde",
      subtitle: "Le Sénégal affine sa stratégie pour la compétition mondiale.",
      excerpt:
        "L'équipe nationale du Sénégal se prépare intensivement pour défendre les couleurs du pays.",
      body: `<p>L'équipe nationale du Sénégal se prépare intensivement pour la prochaine Coupe du Monde. Sous la direction de leur sélectionneur, les Lions de la Téranga multiplient les stages d'entraînement et les matchs amicaux de haut niveau.</p>

<h2>Une génération dorée</h2>
<p>Le Sénégal peut compter sur une génération exceptionnelle de joueurs évoluant dans les plus grands clubs européens. Cette richesse de talent confère à l'équipe une profondeur de banc remarquable et une polyvalence tactique enviée par de nombreuses nations.</p>

<p>Les performances récentes en compétitions continentales ont démontré la maturité et la régularité de cette sélection, désormais considérée comme un candidat sérieux au titre mondial.</p>

<h2>Préparation stratégique</h2>
<p>Le staff technique a mis en place un programme de préparation rigoureux, combinant analyses vidéo avancées, préparation physique de pointe et travail tactique approfondi. Chaque détail est pensé pour optimiser les chances de réussite de l'équipe.</p>`,
      coverImage: IMGS[2],
      categorySlug: "sport",
      tagSlugs: ["football", "afrique"],
      featured: false,
      readTime: 4,
      views: 8900,
    },
    {
      title: "Innovation technologique : Le hub numérique de Dakar",
      slug: "innovation-technologique-hub-numerique-dakar",
      subtitle:
        "La capitale sénégalaise s'affirme comme leader tech du continent.",
      excerpt:
        "Dakar continue d'attirer les investissements technologiques et se positionne comme la Silicon Valley africaine.",
      body: `<p>Dakar continue d'attirer les investissements technologiques et se positionne de plus en plus comme un hub d'innovation majeur sur le continent africain. Les startups locales rivalisent d'ingéniosité pour proposer des solutions adaptées aux défis spécifiques du marché africain.</p>

<h2>Un écosystème en pleine expansion</h2>
<p>Le nombre de startups tech basées à Dakar a été multiplié par cinq en l'espace de trois ans. Les incubateurs et accélérateurs se multiplient, attirant des entrepreneurs de toute l'Afrique francophone et au-delà.</p>

<p>Les secteurs de la fintech, de l'agritech et de la healthtech sont particulièrement dynamiques, avec des solutions innovantes qui trouvent un écho bien au-delà des frontières sénégalaises.</p>

<h2>Investissements et perspectives</h2>
<p>Les fonds d'investissement internationaux ont injecté des centaines de millions de dollars dans l'écosystème tech dakarois au cours des deux dernières années. Cette confiance des investisseurs témoigne du potentiel considérable du marché numérique ouest-africain.</p>`,
      coverImage: IMGS[0],
      categorySlug: "technologie",
      tagSlugs: ["tech", "afrique"],
      featured: true,
      readTime: 5,
      views: 5600,
    },
    {
      title: "Biennale de Dakar : Un succès retentissant",
      slug: "biennale-dakar-succes-retentissant",
      subtitle: "L'art contemporain africain à l'honneur mondial.",
      excerpt:
        "L'édition de cette année a battu tous les records d'affluence et confirmé Dakar comme capitale de l'art contemporain africain.",
      body: `<p>L'édition de cette année de la Biennale de Dakar a battu tous les records d'affluence, confirmant la position de la capitale sénégalaise comme épicentre de l'art contemporain africain. Des artistes venus de plus de 40 pays ont présenté leurs œuvres dans un parcours artistique exceptionnel.</p>

<h2>Une programmation audacieuse</h2>
<p>La direction artistique a fait le pari de l'innovation en intégrant des formes d'expression contemporaines : installations immersives, art numérique, performances interdisciplinaires. Le résultat a été unanimement salué par la critique internationale.</p>

<p>Les galeries dakaroises ont également profité de cet événement pour présenter de nouveaux talents émergents, contribuant à renouveler le paysage artistique continental.</p>`,
      coverImage: IMGS[4],
      categorySlug: "culture",
      tagSlugs: ["afrique"],
      featured: false,
      readTime: 7,
      views: 4200,
    },
    {
      title: "Sommet sur le climat : Les engagements de l'Afrique",
      slug: "sommet-climat-engagements-afrique",
      subtitle: "Vers une transition énergétique durable et équitable.",
      excerpt:
        "Les dirigeants africains ont porté une voix unie lors du sommet international sur le changement climatique.",
      body: `<p>Les dirigeants africains ont porté une voix unie et déterminée lors du dernier sommet international sur le changement climatique. Pour la première fois, le continent a présenté un front commun avec des propositions concrètes et chiffrées pour une transition énergétique juste.</p>

<h2>Des propositions concrètes</h2>
<p>Le plan d'action africain pour le climat prévoit un investissement massif dans les énergies renouvelables, avec un objectif ambitieux de 60% d'énergie propre d'ici 2035. Ce plan s'accompagne de mesures d'adaptation spécifiques aux réalités du continent.</p>

<p>Les pays du Sahel ont particulièrement insisté sur la nécessité d'un mécanisme de financement équitable pour les nations les plus vulnérables aux effets du changement climatique.</p>

<h2>Solidarité internationale</h2>
<p>La communauté internationale a salué l'engagement africain, tout en reconnaissant la dette climatique historique envers le continent. Des engagements financiers significatifs ont été annoncés pour soutenir la transition verte africaine.</p>`,
      coverImage: IMGS[3],
      categorySlug: "international",
      tagSlugs: ["climat", "afrique"],
      featured: false,
      readTime: 8,
      views: 3100,
    },
    {
      title:
        "Réforme économique majeure : Vers une nouvelle politique monétaire",
      slug: "reforme-economique-nouvelle-politique-monetaire",
      subtitle:
        "Les experts analysent les implications de la réforme proposée.",
      excerpt:
        "Une réforme monétaire d'envergure pourrait redéfinir le paysage économique de toute la sous-région.",
      body: `<p>Une réforme monétaire d'envergure est en discussion au sein des instances économiques régionales. Cette initiative pourrait redéfinir les fondamentaux économiques de l'ensemble de la zone, avec des implications majeures pour le commerce, l'investissement et la croissance.</p>

<h2>Les enjeux de la réforme</h2>
<p>La proposition de réforme vise à renforcer la souveraineté monétaire tout en maintenant la stabilité macroéconomique. Les économistes sont partagés sur les risques et les opportunités de cette transition historique.</p>

<p>Le calendrier de mise en œuvre, étalé sur plusieurs années, prévoit des étapes progressives pour minimiser les perturbations sur les marchés et protéger le pouvoir d'achat des populations.</p>`,
      coverImage: IMGS[9],
      categorySlug: "economie",
      tagSlugs: ["analyse", "afrique"],
      featured: false,
      readTime: 6,
      views: 2800,
    },
    {
      title:
        "Société civile : Le rôle grandissant des mouvements citoyens",
      slug: "societe-civile-role-mouvements-citoyens",
      subtitle: "Comment les citoyens redéfinissent l'engagement politique.",
      excerpt:
        "Les mouvements citoyens prennent une importance croissante dans le débat public africain.",
      body: `<p>Les mouvements citoyens connaissent un essor sans précédent à travers le continent africain. Portés par une jeunesse connectée et engagée, ces mouvements redéfinissent les formes de participation politique et sociale.</p>

<h2>Une nouvelle génération engagée</h2>
<p>La jeunesse africaine, qui représente plus de 60% de la population du continent, utilise les réseaux sociaux et les technologies numériques pour s'organiser, mobiliser et faire entendre sa voix sur les questions qui façonnent son avenir.</p>

<p>Des Dakar à Nairobi, de Lagos à Johannesburg, les initiatives citoyennes se multiplient dans des domaines aussi variés que la gouvernance, l'environnement, l'éducation et les droits humains.</p>`,
      coverImage: IMGS[7],
      categorySlug: "societe",
      tagSlugs: ["afrique"],
      featured: false,
      readTime: 5,
      views: 1900,
    },
    {
      title:
        "Intelligence artificielle : L'Afrique entre dans la course mondiale",
      slug: "intelligence-artificielle-afrique-course-mondiale",
      subtitle:
        "Les startups africaines développent des solutions IA adaptées au continent.",
      excerpt:
        "L'intelligence artificielle made in Africa gagne en crédibilité sur la scène mondiale.",
      body: `<p>L'intelligence artificielle développée en Afrique gagne en crédibilité et en reconnaissance sur la scène mondiale. Des startups innovantes proposent des solutions spécifiquement conçues pour répondre aux défis uniques du continent.</p>

<h2>Des applications concrètes</h2>
<p>De la santé à l'agriculture, de l'éducation aux services financiers, l'IA africaine se distingue par son pragmatisme et son impact social direct. Les solutions développées localement bénéficient d'une compréhension fine des réalités du terrain.</p>

<p>Les centres de recherche en IA se multiplient sur le continent, formant une nouvelle génération de chercheurs et d'ingénieurs qui contribuent activement aux avancées mondiales dans le domaine.</p>`,
      coverImage: IMGS[8],
      categorySlug: "technologie",
      tagSlugs: ["tech", "afrique"],
      featured: false,
      readTime: 5,
      views: 3400,
    },
  ];

  for (const data of articlesData) {
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        excerpt: data.excerpt,
        body: data.body,
        coverImage: data.coverImage,
        status: "published",
        featured: data.featured,
        breaking: data.breaking ?? false,
        readTime: data.readTime,
        views: data.views,
        publishedAt: new Date(
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
        ),
        authorId: editor.id,
        categoryId: catMap[data.categorySlug],
      },
    });

    for (const tagSlug of data.tagSlugs) {
      await prisma.articleTag.create({
        data: { articleId: article.id, tagId: tagMap[tagSlug] },
      });
    }
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
