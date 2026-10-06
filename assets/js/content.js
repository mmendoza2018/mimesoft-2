/* ==========================================================================
   content.js — TODO el texto y los datos del sitio viven aquí.
   Para editar la página no hace falta tocar el HTML.

   >>> Los valores marcados con «REEMPLAZAR» son placeholders. <<<
   Los datos de BUSINESS son los que Meta contrasta con tus documentos
   legales durante la verificación de negocio: tienen que ser exactos.
   ========================================================================== */

/**
 * Datos tomados de la ficha RUC (assets/docs/). Meta los contrasta con el
 * documento durante la verificación de negocio: tienen que coincidir
 * exactamente, incluido el orden de los apellidos.
 */
export const BUSINESS = {
  brand:       'Mimesoft',

  // Dos niveles de exposición a propósito:
  //   displayName / shortAddress  →  landing pública
  //   legalName / taxId / address →  SÓLO páginas legales
  // El RUC de persona natural contiene el DNI (10 + DNI + verificador), así
  // que publicarlo en la portada equivale a publicar el documento.
  displayName:  'Miguel Mendoza',
  shortAddress: 'Arequipa, Perú',

  legalName:   'Mendoza Aquino Luis Miguel',
  taxId:       'RUC 10770608479',
  address:     'A.H. Fuerte Cenepa Mz. A Lote 4, Mariano Melgar, Arequipa, Perú',
  email:       'contacto@mimesoft.site',
  phone:       '+51 994 058 757',
  whatsapp:    '51994058757',              // sólo dígitos, con código de país
  domain:      'https://mimesoft.site',
  founded:     '2021',                     // año desde el que opera como Mimesoft
  // Sin redes todavía. Las que estén vacías no se pintan en el pie: es mejor
  // que un enlace que no lleva a ninguna parte.
  social: {
    linkedin:  '',
    instagram: '',
    github:    '',
  },
};

/** Mensaje precargado al abrir WhatsApp. */
export const WA_MESSAGE = {
  es: 'Hola Mimesoft, me gustaría conversar sobre un proyecto.',
  en: 'Hi Mimesoft, I would like to discuss a project.',
};

export const waLink = (lang = 'es') =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(WA_MESSAGE[lang] || WA_MESSAGE.es)}`;

/* --------------------------------------------------------------------------
   Diccionario de interfaz. Las claves se referencian en el HTML con
   data-i18n="ruta.a.la.clave".
   -------------------------------------------------------------------------- */
export const COPY = {
  es: {
    meta: {
      title: 'Mimesoft — Sistemas, webs y automatizaciones a medida | Arequipa',
      description: 'Consultoría de software en Arequipa: sistemas internos a medida, sitios web, automatización de procesos con n8n e integración de WhatsApp Business API.',
    },
    nav: {
      projects:     'Proyectos',
      solutions:    'Soluciones',
      tech:         'Tecnologías',
      experiences:  'Experiencias',
      contact:      'Contacto',
      cta:          'Hablemos',
    },
    hero: {
      caption:  'Consultoría de software',
      heading:  'Sistemas, webs y automatizaciones a medida',
      text:     'Desarrollamos software para empresas que necesitan dejar de operar a mano: sistemas internos, sitios web, procesos automatizados y chatbots sobre la API de WhatsApp Business.',
      cta:      'Hablemos por WhatsApp',
      float1:   { label: 'Proyectos entregados',    value: '+20',  meta: 'Para clientes reales' },
      float2:   { label: 'Operando desde',          value: '2021', meta: 'Arequipa, Perú' },
      float3:   { label: 'Compromiso de respuesta', value: '24h',  meta: 'En días hábiles' },
    },
    about: {
      caption: 'Qué hacemos',
      heading: 'Diseñamos, desarrollamos y mantenemos el software que tu empresa necesita.',
      cards: [
        {
          title: 'Desarrollo',
          items: ['Sistemas internos a medida', 'Sitios y aplicaciones web', 'Integraciones con APIs de terceros'],
        },
        {
          title: 'Automatización',
          items: ['Workflows en n8n', 'Sincronización entre sistemas', 'Reportes y alertas automáticas'],
        },
        {
          title: 'Mensajería',
          items: ['WhatsApp Business API', 'Chatbots con IA', 'Soporte y mantenimiento'],
        },
      ],
    },

    projects: {
      caption: 'Proyectos',
      heading: 'Lo que hemos construido',
      link:    'Cuéntanos tu proyecto',
      filters: {
        all:        'Todos',
        system:     'Sistemas',
        web:        'Sitios web',
        automation: 'Automatizaciones',
        chatbot:    'Chatbots',
      },
      views:  { index: 'Índice', gallery: 'Galería' },
      labels: {
        problem:  'El problema',
        solution: 'La solución',
        stack:    'Stack',
        result:   'Resultado',
        open:     'Ver detalle',
        close:    'Cerrar detalle',
        demo:     'Proyecto propio',
        empty:    'No hay proyectos de este tipo todavía.',
      },
    },

    solutions: {
      caption: 'Soluciones',
      items: [
        {
          caption: 'Sistemas a medida',
          heading: 'Sistemas internos hechos para cómo trabaja tu equipo',
          body:    'Cuando el ERP genérico no encaja y la hoja de cálculo ya no da más, construimos la herramienta exacta que tu operación necesita.',
          link:    'Ver sistemas',
        },
        {
          caption: 'Desarrollo web',
          heading: 'Páginas y aplicaciones web que cargan rápido y convierten',
          body:    'Diseño y desarrollo a medida, optimizados para buscadores y pensados para que tu equipo los mantenga sin depender de nosotros.',
          link:    'Ver sitios web',
        },
        {
          caption: 'Automatización',
          heading: 'Automatizaciones con n8n que eliminan el trabajo repetitivo',
          body:    'Conectamos tus herramientas —CRM, hojas de cálculo, pasarelas de pago, correo— en flujos que se ejecutan solos y te avisan sólo cuando algo necesita tu atención.',
          link:    'Ver automatizaciones',
        },
        {
          caption: 'WhatsApp y chatbots',
          heading: 'Integración oficial de WhatsApp Business API y chatbots con IA',
          body:    'Implementamos la API de WhatsApp Business de principio a fin —alta y verificación, plantillas, webhooks— y la conectamos con tu CRM o tu sistema interno.',
          link:    'Ver chatbots',
        },
      ],
    },

    tech: {
      caption: 'Tecnologías',
      heading: 'El stack con el que construimos',
      text:    'Herramientas probadas en producción, no experimentos.',
    },
    experiences: {
      caption:  'Experiencias de clientes',
      heading1: 'Clientes',
      heading2: 'Satisfechos',
    },
    contact: {
      caption: 'Contacto',
      heading: 'Hablemos de tu proyecto',
      text:    'Escríbenos por WhatsApp y te respondemos el mismo día hábil. Sin formularios eternos ni llamadas de ventas.',
      cta:     'Abrir WhatsApp',
      identity: {
        title:    'Datos de contacto',
        legal:    'Responsable',
        taxId:    'RUC',
        address:  'Ubicación',
        email:    'Correo',
        phone:    'Teléfono',
        full:     'Datos fiscales completos en la Política de Privacidad',
      },
    },
    footer: {
      marquee:  'Hablemos por WhatsApp',
      blurb:    'Consultoría de software: sistemas a medida, sitios web, automatización de procesos e integración de mensajería.',
      pages:    'Navegación',
      legalCol: 'Legal',
      social:   'Síguenos',
      privacy:  'Política de Privacidad',
      terms:    'Términos de Servicio',
      deletion: 'Eliminación de datos',
      rights:   'Todos los derechos reservados.',
    },
    ctaBar: {
      text: 'Cuéntanos qué necesitas construir',
      cta:  'Escribir',
    },
    a11y: {
      toTop:   'Volver al inicio',
      menu:    'Abrir menú',
      theme:   'Cambiar tema',
      lang:    'Cambiar idioma',
      loading: 'Cargando',
      filters: 'Filtrar proyectos por tipo',
      views:   'Cambiar modo de vista',
    },
  },

  /* ------------------------------------------------------------------------
     Inglés. Estructura completa para que el toggle funcione desde el día uno;
     si Meta pide la revisión en inglés, ya está listo.
     ------------------------------------------------------------------------ */
  en: {
    meta: {
      title: 'Mimesoft — Custom systems, websites and automations | Peru',
      description: 'Software consultancy in Arequipa, Peru: custom internal systems, websites, process automation with n8n and WhatsApp Business API integration.',
    },
    nav: {
      projects:    'Work',
      solutions:   'Solutions',
      tech:        'Technologies',
      experiences: 'Clients',
      contact:     'Contact',
      cta:         'Get in touch',
    },
    hero: {
      caption: 'Software consultancy',
      heading: 'Custom systems, websites and automations',
      text:    'We build software for companies that need to stop working by hand: internal systems, websites, automated processes and chatbots on the WhatsApp Business API.',
      cta:     'Message us on WhatsApp',
      float1:  { label: 'Projects delivered', value: '+20',  meta: 'For real clients' },
      float2:  { label: 'Operating since',    value: '2021', meta: 'Arequipa, Peru' },
      float3:  { label: 'Response commitment', value: '24h', meta: 'On business days' },
    },
    about: {
      caption: 'What we do',
      heading: 'We design, build and maintain the software your company needs.',
      cards: [
        { title: 'Development', items: ['Custom internal systems', 'Websites and web apps', 'Third-party API integrations'] },
        { title: 'Automation',  items: ['n8n workflows', 'System-to-system sync', 'Automated reports and alerts'] },
        { title: 'Messaging',   items: ['WhatsApp Business API', 'AI chatbots', 'Support and maintenance'] },
      ],
    },

    projects: {
      caption: 'Work',
      heading: 'What we have built',
      link:    'Tell us about your project',
      filters: {
        all:        'All',
        system:     'Systems',
        web:        'Websites',
        automation: 'Automations',
        chatbot:    'Chatbots',
      },
      views:  { index: 'Index', gallery: 'Gallery' },
      labels: {
        problem:  'The problem',
        solution: 'What we built',
        stack:    'Stack',
        result:   'Result',
        open:     'View detail',
        close:    'Close detail',
        demo:     'In-house project',
        empty:    'No projects of this type yet.',
      },
    },

    solutions: {
      caption: 'Solutions',
      items: [
        { caption: 'Custom systems',       heading: 'Internal systems built around how your team actually works', body: 'When the off-the-shelf ERP does not fit and the spreadsheet has run out of road, we build the exact tool your operation needs.', link: 'See systems' },
        { caption: 'Web development',      heading: 'Websites and apps that load fast and convert',               body: 'Custom design and development, search-optimised and built so your team can maintain them without depending on us.', link: 'See websites' },
        { caption: 'Automation',           heading: 'n8n automations that remove repetitive work',                body: 'We connect your tools — CRM, spreadsheets, payment gateways, email — into flows that run themselves and only ping you when something needs you.', link: 'See automations' },
        { caption: 'WhatsApp and chatbots', heading: 'Official WhatsApp Business API integration and AI chatbots', body: 'We implement the WhatsApp Business API end to end — setup and verification, templates, webhooks — and wire it into your CRM or internal system.', link: 'See chatbots' },
      ],
    },

    tech: { caption: 'Technologies', heading: 'The stack we build with', text: 'Tools proven in production, not experiments.' },
    experiences: { caption: 'Client stories', heading1: 'Happy', heading2: 'Clients' },
    contact: {
      caption: 'Contact',
      heading: 'Let us talk about your project',
      text:    'Message us on WhatsApp and we reply the same business day. No endless forms, no sales calls.',
      cta:     'Open WhatsApp',
      identity: {
        title: 'Contact details', legal: 'Contact', taxId: 'Tax ID', address: 'Location',
        email: 'Email', phone: 'Phone',
        full:  'Full tax details in the Privacy Policy',
      },
    },
    footer: {
      marquee: 'Let us talk on WhatsApp',
      blurb:   'Software consultancy: custom systems, websites, process automation and messaging integration.',
      pages:   'Navigation', legalCol: 'Legal', social: 'Follow us',
      privacy: 'Privacy Policy', terms: 'Terms of Service', deletion: 'Data Deletion',
      rights:  'All rights reserved.',
    },
    ctaBar: { text: 'Tell us what you need built', cta: 'Message' },
    a11y:   { toTop: 'Back to top', menu: 'Open menu', theme: 'Toggle theme', lang: 'Change language', loading: 'Loading', filters: 'Filter work by type', views: 'Change view mode' },
  },
};

/* --------------------------------------------------------------------------
   Datos. Edita estas listas y la página se actualiza sola.
   -------------------------------------------------------------------------- */

/** El orden aquí es el orden de los chips de filtro. */
export const PROJECT_TYPES = ['system', 'web', 'automation', 'chatbot'];

/** REEMPLAZAR con tu stack real. `icon` apunta a assets/img/tech/<archivo>. */
export const TECH = [
  { name: 'PHP',            icon: 'tech/php.svg' },
  { name: 'Laravel',        icon: 'tech/laravel.svg' },
  { name: 'MySQL',          icon: 'tech/mysql.svg' },
  { name: 'JavaScript',     icon: 'tech/js.svg' },
  { name: 'Tailwind',       icon: 'tech/tailwind.svg' },
  { name: 'Bootstrap',      icon: 'tech/bootstrap.svg' },
  { name: 'Alpine.js',      icon: 'tech/alpine.svg' },
  { name: 'Docker',         icon: 'tech/docker.svg' },
  { name: 'n8n',            icon: 'tech/n8n.svg' },
  { name: 'WhatsApp API',   icon: 'tech/whatsapp.svg' },
  { name: 'Google Calendar',icon: 'tech/calendar.svg' },
  { name: 'OpenAI',         icon: 'tech/openai.svg' },
];

/* --------------------------------------------------------------------------
   PROYECTOS

   Cada proyecto necesita: type, client, year, title, summary, problem,
   solution, stack y result. Lo único que cambia según el tipo es el VISUAL:

     type:'system' | 'web'  →  `image`: una captura real
     type:'automation'      →  `flow` : nodos y conexiones, se dibuja en SVG
     type:'chatbot'         →  `chat` : mensajes, se dibuja como conversación

   Es decir: para automatizaciones y chatbots NO hace falta producir ninguna
   imagen. Se dibujan por código y salen siempre coherentes con la paleta.

   `demo: true` marca un proyecto propio en lugar de un encargo de cliente.
   Úsalo sin reparos: es mejor que insinuar que un demo fue trabajo pagado.

   >>> TODOS los de abajo son PLACEHOLDER. Reemplázalos por trabajo real. <<<
   -------------------------------------------------------------------------- */
export const PROJECTS = [
  {
    slug: 'control-equipos-mina', type: 'system',
    client: 'G&T Empresarial', year: '2022',
    image: 'general/control-equipos-mina.webp',
    title: {
      es: 'Control de equipos y mantenimiento para minería',
      en: 'Equipment and maintenance control for mining',
    },
    summary: {
      es: 'Mantenimiento preventivo y correctivo de toda la flota, en un solo sistema.',
      en: 'Preventive and corrective maintenance for the whole fleet, in one system.',
    },
    problem: {
      es: 'La flota —grúas, camionetas, volquetes y maquinaria de mina— se controlaba a mano. No había forma de saber de un vistazo a qué equipo le tocaba mantenimiento, y las fallas se atendían cuando el equipo ya estaba parado.',
      en: 'The fleet — cranes, pickups, dump trucks and mine machinery — was tracked by hand. There was no way to see at a glance which unit was due for service, and breakdowns were handled only once the machine had already stopped.',
    },
    solution: {
      es: 'Un sistema que registra cada equipo con su historial, programa los mantenimientos preventivos por horómetro o por fecha y avisa antes de que venzan. Las fallas se reportan como mantenimiento correctivo y quedan ligadas al equipo, así que el historial de cada máquina está completo.',
      en: 'A system that registers every unit with its full history, schedules preventive maintenance by hour-meter or by date, and warns before it falls due. Breakdowns are logged as corrective maintenance and tied to the unit, so each machine keeps a complete record.',
    },
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    // `result` es opcional: si no está, la ficha no muestra el bloque de cifra.
  },
  {
    slug: 'erp-asac', type: 'system', client: 'ASAC Arequipa', year: '2023',
    image: 'general/erp-asac.webp',
    title: {
      es: 'ERP a medida para personal, beneficiarios y almacén',
      en: 'Custom ERP for staff, beneficiaries and inventory',
    },
    summary: {
      es: 'Tres áreas que iban por separado, en un solo sistema.',
      en: 'Three areas that ran separately, brought into one system.',
    },
    problem: {
      es: 'Cada área llevaba su propio registro: el personal por un lado, las personas a las que ayudaban por otro, y el almacén en hojas de cálculo.',
      en: 'Each area kept its own records: staff on one side, the people they helped on another, and the warehouse in spreadsheets.',
    },
    solution: {
      es: 'Un ERP con fichas de personal, asistencias y permisos; registro de beneficiarios; y almacén con ingresos, salidas, stock y transferencias.',
      en: 'An ERP with staff files, attendance and leave; a beneficiary registry; and a warehouse with inbound, outbound, stock and transfers.',
    },
    stack: ['PHP', 'MySQL', 'Tailwind'],
    result: { value: '6', label: { es: 'módulos en un solo sistema', en: 'modules in a single system' } },
  },
  {
    slug: 'ecommerce-mistiplas', type: 'web', client: 'Mistiplas', year: '2024',
    image: 'general/ecommerce-mistiplas.webp',
    title: {
      es: 'Tienda en línea de insumos para crianza',
      en: 'Online store for animal-rearing supplies',
    },
    summary: {
      es: 'Catálogo, carrito y pagos para una avícola.',
      en: 'Catalogue, cart and payments for a poultry supplier.',
    },
    problem: {
      es: 'Vendían por teléfono y WhatsApp, con el catálogo repartido en fotos sueltas y los pedidos anotados a mano.',
      en: 'They sold by phone and WhatsApp, with the catalogue scattered across loose photos and orders written down by hand.',
    },
    solution: {
      es: 'Un e-commerce completo: catálogo de comederos, bebederos, niples y tinas organizado por tipo de crianza, carrito, pagos en línea y gestión de pedidos desde el panel.',
      en: 'A full e-commerce: a catalogue of feeders, drinkers, nipples and tubs organised by animal type, cart, online payments and order management from the admin panel.',
    },
    stack: ['Laravel', 'Tailwind', 'Alpine.js', 'Docker'],
    // REEMPLAZAR por la cifra real cuando la tengas.
    result: { value: '+200', label: { es: 'productos en catálogo', en: 'products in the catalogue' } },
  },
  {
    slug: 'agroalto-piura', type: 'web', client: 'Agro Alto Piura', year: '2024',
    image: 'projects/agroalto-piura.webp',
    title: {
      es: 'Sitio de variedades de fruta para exportación',
      en: 'Fruit variety showcase for export markets',
    },
    summary: {
      es: 'Catálogo de variedades para exportadores potenciales.',
      en: 'A variety catalogue aimed at potential exporters.',
    },
    problem: {
      es: 'Un exportador interesado no tenía dónde consultar qué variedades se producen ni sus características: la información estaba en fichas sueltas y correos.',
      en: 'An interested exporter had nowhere to look up which varieties are grown or their characteristics: the information lived in loose sheets and emails.',
    },
    solution: {
      es: 'Un sitio que presenta cada variedad con sus características y temporada, pensado para que un exportador entienda la oferta sin tener que preguntar.',
      en: 'A site presenting each variety with its characteristics and season, built so an exporter can understand the offer without having to ask.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
    // REEMPLAZAR por la cifra real cuando la tengas.
    result: { value: '+20', label: { es: 'variedades publicadas', en: 'varieties published' } },
  },

  /* --- Automatizaciones: sin imagen; el diagrama se dibuja desde `flow` --- */
  {
    slug: 'wa-odontologia', type: 'automation', demo: true, year: '2025',
    image: 'general/automatizacion-n8n.webp',
    title: {
      es: 'Atención automatizada de WhatsApp para clínica dental',
      en: 'Automated WhatsApp handling for a dental clinic',
    },
    summary: {
      es: 'Los mensajes se clasifican, responden y agendan solos.',
      en: 'Messages get classified, answered and booked automatically.',
    },
    problem: {
      es: 'Los mensajes se acumulaban fuera de horario y recepción respondía a mano las mismas preguntas: precios, horarios y disponibilidad para citas.',
      en: 'Messages piled up outside office hours and reception answered the same questions by hand: prices, opening times and appointment availability.',
    },
    solution: {
      es: 'Un flujo en n8n que clasifica cada mensaje entrante, responde las consultas frecuentes, agenda o reprograma la cita, envía el recordatorio el día antes y deriva a recepción sólo cuando hace falta una persona.',
      en: 'An n8n flow that classifies each incoming message, answers common questions, books or reschedules the appointment, sends a reminder the day before, and hands over to reception only when a person is actually needed.',
    },
    stack: ['n8n', 'WhatsApp API', 'Google Calendar'],
    result: { value: '24/7', label: { es: 'atención sin intervención manual', en: 'coverage with no manual handling' } },
    flow: {
      nodes: [
        { id: 'in',   label: { es: 'Mensaje entrante',        en: 'Incoming message' } },
        { id: 'cls',  label: { es: 'Clasificar intención',    en: 'Classify intent' } },
        { id: 'ans',  label: { es: 'Responder consulta',      en: 'Answer the question' } },
        { id: 'book', label: { es: 'Agendar o reprogramar',   en: 'Book or reschedule' } },
        { id: 'rem',  label: { es: 'Recordatorio 24 h antes', en: 'Reminder 24 h before' } },
        { id: 'esc',  label: { es: 'Derivar a recepción',     en: 'Hand over to reception' } },
      ],
      edges: [['in', 'cls'], ['cls', 'ans'], ['ans', 'book'], ['book', 'rem'], ['rem', 'esc']],
    },
  },

  /* --- Chatbots: sin imagen; la conversación se dibuja desde `chat` ------- */
  {
    slug: 'bot-catalogo', type: 'chatbot', demo: true, year: '2025',
    title: {
      es: 'Chatbot de catálogo y pedidos por WhatsApp',
      en: 'Catalogue and ordering chatbot on WhatsApp',
    },
    summary: {
      es: 'Del catálogo al pago sin salir del chat.',
      en: 'From catalogue to payment without leaving the chat.',
    },
    problem: {
      es: 'El cliente preguntaba por un producto y alguien tenía que buscar el precio, confirmar el stock y pasar los datos de pago a mano, uno por uno.',
      en: 'A customer asked about a product and someone had to look up the price, check stock and send payment details by hand, one at a time.',
    },
    solution: {
      es: 'Un asistente conectado al catálogo: busca el producto, confirma stock y precio en tiempo real, arma el pedido y devuelve el enlace de pago dentro de la misma conversación.',
      en: 'An assistant wired into the catalogue: it finds the product, confirms stock and price in real time, builds the order and returns the payment link inside the same conversation.',
    },
    stack: ['WhatsApp API', 'n8n', 'OpenAI'],
    result: { value: '3', label: { es: 'pasos del catálogo al pago', en: 'steps from catalogue to payment' } },
    chat: [
      { from: 'user', text: { es: 'Hola, ¿cuánto cuesta el bebedero de 10 litros?', en: 'Hi, how much is the 10-litre drinker?' } },
      { from: 'bot',  text: { es: 'Cuesta S/ 42. Quedan 18 en stock. ¿Cuántos quieres?', en: "It's S/ 42. There are 18 in stock. How many would you like?" } },
      { from: 'user', text: { es: 'Dos, y un comedero de 5 kg', en: 'Two, plus a 5 kg feeder' } },
      { from: 'bot',  text: { es: 'Listo: 2 bebederos + 1 comedero = S/ 118. Aquí tienes el enlace de pago.', en: 'Done: 2 drinkers + 1 feeder = S/ 118. Here is your payment link.' } },
    ],
  },
  {
    slug: 'bot-canchas', type: 'chatbot', demo: true, year: '2025',
    title: {
      es: 'Chatbot de reservas para canchas de fútbol',
      en: 'Booking chatbot for football pitches',
    },
    summary: {
      es: 'Consulta horarios, reserva y confirma en dos mensajes.',
      en: 'Checks availability, books and confirms in two messages.',
    },
    problem: {
      es: 'Las reservas se tomaban por llamada y se anotaban en un cuaderno. Había horarios duplicados y nadie sabía qué quedaba libre sin preguntar.',
      en: 'Bookings were taken by phone and written in a notebook. Slots got double-booked and nobody knew what was free without asking.',
    },
    solution: {
      es: 'Un asistente que consulta la disponibilidad real, muestra los horarios libres del día pedido, reserva la cancha y envía un recordatorio antes del partido.',
      en: 'An assistant that checks real availability, shows the free slots for the requested day, books the pitch and sends a reminder before the match.',
    },
    stack: ['WhatsApp API', 'n8n', 'Google Calendar'],
    result: { value: '2', label: { es: 'mensajes para reservar', en: 'messages to book' } },
    chat: [
      { from: 'user', text: { es: '¿Tienen cancha libre el sábado en la noche?', en: 'Any pitch free on Saturday evening?' } },
      { from: 'bot',  text: { es: 'El sábado quedan libres 19:00, 20:00 y 22:00. ¿Cuál reservo?', en: 'On Saturday I have 19:00, 20:00 and 22:00 free. Which one shall I book?' } },
      { from: 'user', text: { es: 'La de 20:00', en: 'The 20:00 one' } },
      { from: 'bot',  text: { es: 'Reservado: cancha 2, sábado 20:00 a 21:00. Te recuerdo dos horas antes.', en: 'Booked: pitch 2, Saturday 20:00 to 21:00. I will remind you two hours before.' } },
    ],
  },
];

/**
 * REEMPLAZAR con testimonios reales.
 * Si no tienes testimonios reales, deja el array vacío: la sección se oculta
 * sola. Inventarlos en un sitio que Meta va a revisar no compensa.
 */
export const EXPERIENCES = [
  // {
  //   quote:  { es: '…', en: '…' },
  //   author: 'Nombre Apellido',
  //   role:   { es: 'Cargo, Empresa', en: 'Role, Company' },
  // },
];
