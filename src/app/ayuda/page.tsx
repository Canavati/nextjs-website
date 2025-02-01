'use client';

import { motion } from 'framer-motion';
import { 
  Phone, 
  EnvelopeSimple, 
  ChatCircleText, 
  Article, 
  Headset,
  WifiHigh,
  DeviceMobile,
  Television,
  Lightning,
  Receipt,
  Wrench,
  Package,
  CaretDown
} from '@phosphor-icons/react';
import { useState } from 'react';
import Link from 'next/link';
import FAQItem from '@/components/ui/FAQItem';

const helpResources = [
  {
    icon: Phone,
    title: 'Atención Telefónica',
    description: 'Llámanos al 900 XXX XXX',
    link: 'tel:900XXXXXX',
    buttonText: 'Llamar ahora'
  },
  {
    icon: EnvelopeSimple,
    title: 'Correo Electrónico',
    description: 'soporte@unimovil.com',
    link: 'mailto:soporte@unimovil.com',
    buttonText: 'Enviar email'
  },
  {
    icon: ChatCircleText,
    title: 'Chat en Línea',
    description: 'Chatea con nuestro equipo',
    link: '#chat',
    buttonText: 'Iniciar chat'
  },
  {
    icon: Article,
    title: 'Centro de Ayuda',
    description: 'Consulta nuestras guías',
    link: '/guias',
    buttonText: 'Ver guías'
  }
];

const helpSections = [
  {
    id: 'atencion',
    title: 'Atención al Cliente',
    icon: Headset,
    faqs: [
      {
        question: '¿Cómo llamar a atención al cliente desde el extranjero?',
        answer: 'Para contactar con atención al cliente desde el extranjero, puedes llamar al +34 XXX XXX XXX. El servicio está disponible las 24 horas para emergencias.'
      },
      {
        question: '¿Qué necesito para contratar servicios de UNIMOVIL?',
        answer: 'Para contratar nuestros servicios necesitas: DNI/NIE en vigor, datos de contacto, dirección de instalación para servicios de fibra, y datos bancarios para la domiciliación.'
      },
      {
        question: '¿Cómo se desarrolla el procedimiento tras una denuncia o comunicación?',
        answer: 'Tras recibir una denuncia o comunicación: 1) Registramos el caso, 2) Un especialista evalúa la situación, 3) Te contactamos en 24-48h con una respuesta, 4) Implementamos la solución acordada.'
      },
      {
        question: 'Código Ético de UNIMOVIL',
        answer: 'Nuestro Código Ético se basa en: transparencia en precios y servicios, compromiso con la calidad, respeto al cliente, protección de datos, y responsabilidad medioambiental.'
      },
      {
        question: '¿Cómo puedo acceder a promociones especiales?',
        answer: 'Puedes acceder a nuestras promociones a través de: nuestra web oficial, llamando a atención al cliente, o visitando nuestras tiendas físicas. Las promociones están sujetas a disponibilidad y condiciones específicas.'
      },
      {
        question: '¿Puedo mantener mi tarifa actual y acceder a nuevas promociones?',
        answer: 'Sí, en muchos casos puedes beneficiarte de nuevas promociones manteniendo tu tarifa actual. Contacta con atención al cliente para conocer las opciones disponibles para tu caso específico.'
      },
      {
        question: '¿Dónde consulto los detalles y condiciones de las promociones?',
        answer: 'Puedes consultar los detalles y condiciones de las promociones en: nuestra web (sección promociones), documentación contractual, o solicitando información a nuestro equipo de atención al cliente.'
      },
      {
        question: '¿Cómo contacto con atención al cliente desde el extranjero?',
        answer: 'Desde el extranjero puedes: 1) Llamar al +34 XXX XXX XXX, 2) Usar nuestro chat online, 3) Enviar un email a soporte@unimovil.com, 4) Usar nuestra app móvil.'
      },
      {
        question: '¿Cómo puedo contratar las tarifas de UNIMOVIL?',
        answer: 'Puedes contratar nuestras tarifas de varias formas: 1) Online a través de nuestra web, 2) Llamando al 900 XXX XXX, 3) En nuestras tiendas físicas, 4) A través de nuestros comerciales autorizados.'
      }
    ]
  },
  {
    id: 'fibra-movil',
    title: 'Fibra + Móvil',
    icon: Package,
    faqs: [
      {
        question: 'No me funciona internet en casa, ¿qué puedo hacer?',
        answer: 'Si tienes problemas con tu conexión, sigue estos pasos: 1) Comprueba que el router está correctamente conectado y encendido, 2) Reinicia el router desconectándolo 30 segundos, 3) Verifica que los cables están bien conectados, 4) Si el problema persiste, contacta con nuestro servicio técnico 24/7.'
      },
      {
        question: '¿Cuál es la velocidad de la fibra óptica?',
        answer: 'En UNIMOVIL ofrecemos diferentes velocidades de fibra óptica simétrica: 300Mb, 600Mb y 1Gb. La velocidad real puede variar según las condiciones técnicas de tu zona y la instalación.'
      },
      {
        question: '¿Cómo puedo elegir los gigas a compartir en cada línea móvil?',
        answer: 'Puedes gestionar los gigas compartidos de tus líneas móviles desde: 1) Tu área de cliente en la web, 2) La app de UNIMOVIL, 3) Llamando a atención al cliente. El reparto de datos se hace efectivo inmediatamente.'
      },
      {
        question: '¿Las tarifas de fibra y móvil tienen permanencia?',
        answer: 'No, en UNIMOVIL no aplicamos permanencia en nuestros servicios de fibra y móvil. Eres libre de modificar o dar de baja tu tarifa cuando lo necesites, sin penalizaciones.'
      },
      {
        question: '¿Cuánto tarda el proceso de contratación y portabilidad?',
        answer: 'El proceso completo suele tardar: 1) Instalación de fibra: 5-7 días laborables, 2) Portabilidad móvil: 24-48 horas, 3) Activación de servicios: inmediata tras la instalación. Te mantendremos informado en cada paso del proceso.'
      },
      {
        question: 'Detalles y condiciones de las tarifas de fibra y móvil',
        answer: 'Nuestras tarifas incluyen: 1) Fibra simétrica sin límite de datos, 2) Líneas móviles con llamadas ilimitadas, 3) Router WiFi 6 incluido, 4) Instalación gratuita, 5) Sin permanencia. Consulta condiciones específicas de cada tarifa en nuestra web o con nuestro equipo comercial.'
      },
      {
        question: '¿Cómo llamar a atención al cliente desde el extranjero?',
        answer: 'Desde el extranjero puedes contactarnos: 1) Llamando al +34 XXX XXX XXX, 2) A través de nuestra app, 3) Por email a soporte@unimovil.com, 4) Chat online en nuestra web. El servicio está disponible 24/7 para emergencias.'
      }
    ]
  },
  {
    id: 'fibra',
    title: 'Fibra',
    icon: WifiHigh,
    faqs: [
      // Page 1
      {
        question: '¿No funciona el internet en mi casa, qué debo hacer?',
        answer: 'Si tienes problemas con tu conexión, sigue estos pasos: 1) Verifica que el router esté enchufado y encendido, 2) Comprueba las conexiones de los cables, 3) Reinicia el router desconectándolo durante 30 segundos, 4) Si el problema persiste, contacta con nuestro servicio técnico 24/7.'
      },
      {
        question: '¿No funciona el internet de fibra óptica en casa, qué solución hay?',
        answer: 'Para resolver problemas con la fibra óptica: 1) Verifica que el cable de fibra no esté dañado, 2) Comprueba que el router ONT esté correctamente conectado, 3) Revisa los indicadores luminosos del router, 4) Si las luces indican algún problema o persisten los fallos, contacta con soporte técnico.'
      },
      {
        question: '¿Qué velocidad tiene la fibra óptica de UNIMOVIL?',
        answer: 'UNIMOVIL ofrece diferentes velocidades de fibra óptica simétrica: 300Mb, 600Mb y 1Gb. La velocidad real puede variar según las condiciones técnicas de tu zona y la instalación.'
      },
      {
        question: 'Tengo el servicio ON/OFF, ¿cómo solicito la suspensión temporal (OFF)?',
        answer: 'Para solicitar la suspensión temporal (OFF): 1) Contacta con atención al cliente, 2) Especifica el período de suspensión deseado, 3) La suspensión se activará en la fecha solicitada. Recuerda que el servicio ON/OFF te permite pausar tu fibra temporalmente manteniendo tu línea.'
      },
      {
        question: 'Quiero reactivar mi servicio ON/OFF (ON), ¿cómo lo solicito?',
        answer: 'Para reactivar tu servicio (ON): 1) Llama a atención al cliente o usa nuestra app, 2) Indica la fecha de reactivación deseada, 3) El servicio se reactivará automáticamente en la fecha especificada. La reactivación es inmediata si la solicitas durante horario comercial.'
      },
      {
        question: '¿El router WiFi 6 necesita configuración especial?',
        answer: 'El router WiFi 6 viene preconfigurado, pero puedes optimizarlo: 1) Usa la app de UNIMOVIL para gestionar la red, 2) Personaliza el nombre y contraseña, 3) Configura la banda de 5GHz para mejor rendimiento, 4) Actualiza el firmware cuando esté disponible.'
      },
      {
        question: 'He hecho un test de velocidad y no veo 1Gb',
        answer: 'Varios factores pueden afectar la medición: 1) El dispositivo debe ser compatible con 1Gb, 2) Usa cable ethernet para pruebas precisas, 3) Realiza la prueba en servidores cercanos, 4) Asegúrate de que no hay otros dispositivos usando la red durante la prueba.'
      },
      {
        question: '¿Me conviene una conexión asimétrica?',
        answer: 'En UNIMOVIL recomendamos conexiones simétricas porque: 1) Ofrecen la misma velocidad de subida y bajada, 2) Son ideales para videollamadas y gaming, 3) Mejoran el rendimiento del teletrabajo, 4) Permiten subir archivos tan rápido como se descargan.'
      },
      {
        question: '¿Por qué es mejor un servicio simétrico?',
        answer: 'Un servicio simétrico es superior porque: 1) Garantiza la misma velocidad en ambas direcciones, 2) Optimiza videoconferencias y streaming, 3) Mejora la experiencia en gaming online, 4) Facilita el trabajo en la nube y las copias de seguridad.'
      },
      {
        question: 'Diferencia entre fibra óptica y ADSL',
        answer: 'Las principales diferencias son: 1) Velocidad: Fibra hasta 1Gb vs ADSL máximo 20Mb, 2) Estabilidad: Fibra más estable y sin interferencias, 3) Latencia: Fibra ofrece menor ping, 4) Distancia: Fibra mantiene la calidad independientemente de la distancia.'
      },
      // Page 2
      {
        question: '¿Cómo funciona el servicio ON/OFF de UNIMOVIL?',
        answer: 'El servicio ON/OFF te permite: 1) Suspender temporalmente tu fibra, 2) Mantener tu línea activa para futuras reactivaciones, 3) Pagar solo una cuota reducida durante la suspensión, 4) Reactivar cuando lo necesites sin costes adicionales.'
      },
      {
        question: '¿Cómo contrato el servicio ON/OFF?',
        answer: 'Para contratar ON/OFF: 1) Disponible para todos los clientes de fibra, 2) Solicítalo en atención al cliente o nuestra web, 3) Sin coste de activación, 4) Flexible según tus necesidades de suspensión.'
      },
      {
        question: '¿Cómo medir la velocidad de mi conexión?',
        answer: 'Para medir tu velocidad correctamente: 1) Usa el medidor oficial de UNIMOVIL en nuestra web, 2) Conecta por cable ethernet para mayor precisión, 3) Cierra otras aplicaciones durante la prueba, 4) Realiza varias mediciones en diferentes momentos.'
      },
      {
        question: '¿Qué cobertura de Fibra tiene UNIMOVIL?',
        answer: 'UNIMOVIL ofrece: 1) Cobertura en principales núcleos urbanos, 2) Expansión continua a nuevas zonas, 3) Verificación de disponibilidad en nuestra web, 4) Estudio personalizado para casos especiales.'
      },
      {
        question: '¿Las tarifas de fibra tienen permanencia?',
        answer: 'No, en UNIMOVIL: 1) No aplicamos permanencia en fibra, 2) Eres libre de modificar o cancelar tu tarifa, 3) Sin penalizaciones por baja, 4) Flexibilidad total para cambiar de plan.'
      },
      {
        question: '¿Puedo contratar ON/OFF si tengo permanencia?',
        answer: 'En UNIMOVIL no hay permanencia, por lo que: 1) Puedes contratar ON/OFF en cualquier momento, 2) Sin compromisos de permanencia adicionales, 3) Flexible para activar y desactivar, 4) Sin condiciones restrictivas.'
      },
      {
        question: '¿Tiene algún coste la instalación de fibra óptica?',
        answer: 'La instalación en UNIMOVIL: 1) Es totalmente gratuita, 2) Incluye todo el equipamiento necesario, 3) Realizada por técnicos profesionales, 4) Sin costes ocultos ni sorpresas.'
      }
    ]
  },
  {
    id: 'movil',
    title: 'Móvil',
    icon: DeviceMobile,
    faqs: [
      // Page 1
      {
        question: '¿Qué son las llamadas VoLTE y cómo disfrutar de esta tecnología?',
        answer: 'VoLTE (Voice over LTE) es una tecnología que permite: 1) Llamadas en alta definición, 2) Conexión más rápida, 3) Mejor calidad de sonido, 4) Uso simultáneo de datos y llamadas. Para utilizarla, tu dispositivo debe ser compatible y estar correctamente configurado.'
      },
      {
        question: '¿Cómo puedo solicitar un duplicado de SIM?',
        answer: 'Para solicitar un duplicado de SIM: 1) Contacta con atención al cliente, 2) Verifica tu identidad, 3) Elige entre SIM física o eSIM, 4) Recógela en tienda o recíbela en casa. El duplicado tiene un coste adicional que se añadirá a tu próxima factura.'
      },
      {
        question: '¿Quieres conectarte a Internet en el extranjero?',
        answer: 'Para usar internet en el extranjero: 1) Activa el roaming en tu móvil, 2) Verifica las tarifas según el país, 3) Configura el APN si es necesario, 4) Considera contratar bonos especiales para mejor precio.'
      },
      {
        question: '¿Qué es el APN y cómo configurarlo según mi modelo de smartphone?',
        answer: 'El APN (Access Point Name) permite la conexión a internet. Para configurarlo: 1) Ve a Ajustes > Redes móviles > APN, 2) Añade nuevo APN con los datos de UNIMOVIL, 3) Guarda la configuración, 4) Selecciona el nuevo APN.'
      },
      {
        question: 'Tengo eSIM y he perdido mi móvil',
        answer: 'Si has perdido tu móvil con eSIM: 1) Contacta inmediatamente con atención al cliente para bloquear la línea, 2) Solicita una nueva eSIM, 3) Podrás activarla en tu nuevo dispositivo, 4) Mantén el código QR de activación en lugar seguro.'
      },
      {
        question: '¿Luego puedo volver a la SIM física?',
        answer: 'Sí, puedes volver a una SIM física: 1) Solicita el cambio a atención al cliente, 2) Elige entre recogerla en tienda o envío a domicilio, 3) La activación es inmediata, 4) No perderás tu número ni configuraciones.'
      },
      {
        question: '¿Cuánto cuesta la tarjeta eSIM?',
        answer: 'La eSIM en UNIMOVIL: 1) Es gratuita en nuevas altas, 2) Tiene un coste reducido en caso de duplicado, 3) Incluye activación y soporte técnico, 4) Consulta promociones especiales disponibles.'
      },
      {
        question: '¿Puedo mantener mi número si me cambio a la eSIM?',
        answer: 'Sí, al cambiar a eSIM: 1) Mantienes tu número actual, 2) El cambio no afecta a tu tarifa, 3) La portabilidad sigue activa, 4) El proceso es inmediato una vez activada.'
      },
      {
        question: '¿Cómo puedo solicitar y activar la eSIM?',
        answer: 'Para solicitar y activar eSIM: 1) Verifica que tu dispositivo es compatible, 2) Contacta con atención al cliente, 3) Recibirás un código QR de activación, 4) Sigue las instrucciones de instalación en tu dispositivo.'
      },
      {
        question: '¿En qué dispositivos puedo activar la eSIM?',
        answer: 'La eSIM es compatible con: 1) iPhones recientes (XS y posteriores), 2) Samsung Galaxy S20 y posteriores, 3) Google Pixel 3 y posteriores, 4) Otros dispositivos con soporte eSIM. Consulta la lista completa en nuestra web.'
      },
      // Page 2
      {
        question: '¿Qué es una eSIM?',
        answer: 'La eSIM es: 1) Una SIM digital integrada en el dispositivo, 2) No requiere tarjeta física, 3) Permite tener múltiples perfiles, 4) Es más segura y ecológica que la SIM tradicional.'
      },
      {
        question: '¿Cómo hacer una llamada internacional?',
        answer: 'Para llamadas internacionales: 1) Marca +/00 seguido del código del país, 2) Añade el número sin el primer 0, 3) Verifica las tarifas aplicables, 4) Considera contratar bonos internacionales para mejor precio.'
      },
      {
        question: 'Condiciones de Roaming',
        answer: 'Nuestro servicio de roaming incluye: 1) Uso en UE como en España, 2) Política de uso razonable, 3) Tarifas especiales fuera de UE, 4) Activación automática en la UE.'
      },
      {
        question: '¿Debo desactivar el roaming al volver a España?',
        answer: 'No es necesario porque: 1) La red se selecciona automáticamente, 2) No hay cargos adicionales, 3) La configuración se mantiene para futuros viajes, 4) El cambio es instantáneo al detectar redes españolas.'
      },
      {
        question: 'He configurado el APN pero no puedo realizar llamadas ni navegar',
        answer: 'Verifica estos puntos: 1) Datos móviles activados, 2) Modo avión desactivado, 3) Selección de red automática, 4) Si persiste, contacta con soporte técnico.'
      },
      {
        question: '¿Es necesario configurar el APN al activar el roaming?',
        answer: 'Normalmente no, porque: 1) El APN se configura automáticamente, 2) Funciona en redes internacionales, 3) Solo requiere tener roaming activado, 4) En caso de problemas, contacta con soporte.'
      },
      {
        question: '¿Debo añadir un prefijo para llamar a España desde el extranjero?',
        answer: 'Sí, para llamar a España: 1) Marca +34 o 0034, 2) Añade el número español sin el primer 9, 3) La llamada se factura según tu tarifa de roaming, 4) Verifica las tarifas aplicables.'
      },
      {
        question: '¿Cuánto tiempo puedo usar el roaming con mi tarifa de UNIMOVIL?',
        answer: 'El uso de roaming en la UE: 1) Sigue la política de uso razonable, 2) Disponible mientras mantengas residencia en España, 3) Límite de 4 meses de uso continuado, 4) Sujeto a condiciones de la tarifa contratada.'
      },
      {
        question: '¿Y si me llaman desde España estando en el extranjero?',
        answer: 'Cuando estás en el extranjero: 1) En la UE, recibir llamadas es gratuito, 2) Fuera de la UE, consulta tarifas específicas, 3) Puedes desviar llamadas si lo prefieres, 4) Configura el buzón de voz para mayor comodidad.'
      },
      {
        question: '¿Qué ocurre con el roaming en Reino Unido tras el Brexit?',
        answer: 'Para el roaming en Reino Unido: 1) Se aplican condiciones especiales, 2) Verifica las tarifas actualizadas, 3) Considera contratar bonos específicos, 4) Consulta la política de uso antes de viajar.'
      },
      // Page 3
      {
        question: '¿Existe roaming gratuito en países europeos fuera de la UE?',
        answer: 'Para países europeos no UE: 1) Consulta condiciones específicas por país, 2) Algunos tienen acuerdos especiales, 3) Verifica coberturas y tarifas, 4) Considera contratar bonos internacionales.'
      },
      {
        question: '¿Cómo puedo controlar mi consumo de datos en el extranjero?',
        answer: 'Controla tu consumo: 1) Usa la app de UNIMOVIL, 2) Activa alertas de consumo, 3) Configura límites de datos, 4) Monitoriza en tiempo real tu uso.'
      },
      {
        question: '¿Hay bonos de llamadas internacionales?',
        answer: 'Ofrecemos varios bonos: 1) Para llamadas internacionales desde España, 2) Para uso en roaming, 3) Packs específicos por zonas, 4) Bonos de datos internacionales.'
      },
      {
        question: '¿Qué diferencia hay entre Roaming y llamadas internacionales?',
        answer: 'Las diferencias son: 1) Roaming: usar tu móvil en el extranjero, 2) Llamadas internacionales: llamar a otros países desde España, 3) Tarifas diferentes para cada servicio, 4) Condiciones y coberturas distintas.'
      },
      {
        question: '¿Cómo se activa el Roaming en UNIMOVIL?',
        answer: 'Para activar el roaming: 1) Está activo por defecto en la UE, 2) Para otros países, solicítalo en atención al cliente, 3) Configura la selección de red en automático, 4) Verifica la cobertura del destino.'
      },
      {
        question: '¿Qué es el roaming?',
        answer: 'El roaming permite: 1) Usar tu línea en el extranjero, 2) Mantener tu número, 3) Acceder a datos y llamadas, 4) Conectarte a redes de otros países.'
      },
      {
        question: '¿Cómo puedo activar el roaming?',
        answer: 'Activa el roaming así: 1) Accede a ajustes del móvil, 2) Busca "Datos en itinerancia" o "Roaming", 3) Activa la opción, 4) Verifica la conexión.'
      },
      {
        question: 'Quiero configurar mi buzón de voz, ¿cómo puedo hacerlo?',
        answer: 'Configura el buzón: 1) Marca *134#, 2) Sigue las instrucciones de voz, 3) Establece tu contraseña, 4) Personaliza tu mensaje de bienvenida.'
      },
      {
        question: 'Si viajo a Estados Unidos, ¿qué servicios tendré y cuál será su coste?',
        answer: 'En EEUU dispondrás de: 1) Tarifas específicas para llamadas y datos, 2) Bonos especiales disponibles, 3) Cobertura en principales operadores, 4) Servicio de atención 24/7.'
      },
      {
        question: 'Números de tarificación especial',
        answer: 'Sobre números especiales: 1) 900: llamadas gratuitas, 2) 901/902: coste compartido, 3) 905: tarificación adicional, 4) Consulta tarifas específicas en nuestra web.'
      }
    ]
  },
  {
    id: 'unitv',
    title: 'UniTV',
    icon: Television,
    faqs: [
      // Page 1
      {
        question: '¿Qué modelos de TV y decodificadores son compatibles con la app UniTV?',
        answer: 'Los dispositivos compatibles incluyen: 1) Smart TVs con Android TV o Google TV, 2) Televisores Samsung con Tizen OS, 3) LG con WebOS, 4) Decodificadores oficiales de UniTV.'
      },
      {
        question: 'No me funciona la televisión, ¿qué puedo hacer?',
        answer: 'Sigue estos pasos: 1) Verifica que el decodificador está encendido y conectado, 2) Comprueba las conexiones HDMI, 3) Reinicia el decodificador desconectándolo 30 segundos, 4) Si persiste el problema, contacta con soporte técnico.'
      },
      {
        question: '¿Cómo puedo participar en el concurso de UniTV?',
        answer: 'Para participar: 1) Regístrate en el área de cliente, 2) Acepta las bases del concurso, 3) Cumple los requisitos de participación, 4) Sigue las instrucciones específicas del concurso actual.'
      },
      {
        question: '¿Qué funcionalidades tiene UniTV?',
        answer: 'UniTV ofrece: 1) Más de 80 canales en HD, 2) Grabación en la nube, 3) Contenido a la carta, 4) Control parental, 5) Pausa en directo, 6) Apps de streaming integradas.'
      },
      {
        question: '¿Cómo instalo mi decodificador de UniTV?',
        answer: 'Para instalar: 1) Conecta el decodificador a la TV con HDMI, 2) Conecta a internet por cable o WiFi, 3) Sigue el asistente de configuración, 4) Si necesitas ayuda, contacta con soporte técnico.'
      },
      {
        question: '¿Cómo conecto mi decodificador al WiFi?',
        answer: 'Pasos de conexión: 1) Accede a Ajustes > Red, 2) Selecciona tu red WiFi, 3) Introduce la contraseña, 4) Verifica la conexión exitosa.'
      },
      {
        question: '¿Cómo modifico el pin parental?',
        answer: 'Para cambiar el PIN: 1) Ve a Ajustes > Control Parental, 2) Introduce el PIN actual, 3) Establece el nuevo PIN, 4) Confirma el cambio.'
      },
      {
        question: '¿Cómo quito/pongo el pin parental?',
        answer: 'Gestiona el control parental: 1) Accede a Ajustes > Control Parental, 2) Introduce el PIN actual, 3) Activa/desactiva la función, 4) Personaliza restricciones si lo deseas.'
      },
      {
        question: 'Algunos canales no me dejan rebobinar...',
        answer: 'Esto puede ocurrir porque: 1) No todos los canales permiten esta función, 2) Verifica los derechos del contenido, 3) Comprueba tu tipo de suscripción, 4) Algunos eventos en directo tienen restricciones.'
      },
      {
        question: '¿Cuántos dispositivos puedo vincular a UniTV?',
        answer: 'Con UniTV puedes: 1) Vincular hasta 5 dispositivos, 2) Ver en 2 pantallas simultáneas, 3) Cambiar dispositivos cuando quieras, 4) Gestionar todo desde tu área de cliente.'
      }
    ]
  },
  {
    id: 'energia',
    title: 'Energía',
    icon: Lightning,
    faqs: [
      {
        question: '¿Cómo puedo contratar energía?',
        answer: 'Puedes contratar energía junto con tus servicios de telecomunicaciones o de forma independiente.'
      },
      {
        question: '¿Qué tarifas de energía ofrecéis?',
        answer: 'Ofrecemos tarifas fijas y variables adaptadas a tu consumo.'
      }
    ]
  },
  {
    id: 'facturacion',
    title: 'Facturación',
    icon: Receipt,
    faqs: [
      {
        question: 'Cómo cambio el IBAN de mi cuenta bancaria',
        answer: 'Para cambiar tu IBAN: 1) Accede a tu área de cliente, 2) Ve a la sección "Datos de facturación", 3) Selecciona "Modificar cuenta bancaria", 4) Introduce el nuevo IBAN y confirma el cambio.'
      },
      {
        question: 'Cómo y dónde pagar una factura pendiente',
        answer: 'Para pagar facturas pendientes: 1) Accede al área de cliente, 2) Selecciona "Facturas pendientes", 3) Elige el método de pago preferido, 4) Realiza el pago siguiendo las instrucciones.'
      },
      {
        question: 'Dónde puedo ver mis facturas',
        answer: 'Puedes consultar tus facturas: 1) En tu área privada de cliente, 2) En el email mensual que recibes, 3) Solicitándolas a atención al cliente, 4) Descargándolas desde nuestra app móvil.'
      },
      {
        question: '¿Desde cuándo se comenzará a cobrar el servicio Aumento Velocidad 1Gb?',
        answer: 'Sobre el cobro del aumento de velocidad: 1) Se aplica desde la activación del servicio, 2) Se prorratea en la primera factura, 3) Se refleja en el siguiente ciclo de facturación, 4) Puedes consultar la fecha exacta en tu área de cliente.'
      },
      {
        question: '¿Qué coste tiene el router?',
        answer: 'Sobre el coste del router: 1) El router está incluido sin coste adicional, 2) No requiere pago inicial ni mensual, 3) Está en régimen de cesión mientras seas cliente, 4) Incluye garantía y soporte técnico.'
      },
      {
        question: '¿Hay costes de instalación?',
        answer: 'Sobre los costes de instalación: 1) La instalación es totalmente gratuita, 2) Incluye todo el material necesario, 3) No hay costes ocultos, 4) El técnico realiza todas las comprobaciones necesarias sin cargo.'
      },
      {
        question: '¿Dónde puedo ver mis facturas?',
        answer: 'Accede a tus facturas: 1) Desde el área privada de cliente en web, 2) A través de la app móvil, 3) En los emails mensuales de facturación, 4) Solicitándolas al servicio de atención al cliente.'
      },
      {
        question: '¿Cómo y dónde pagar una factura pendiente?',
        answer: 'Para pagar facturas pendientes puedes: 1) Usar el área de cliente online, 2) Pagar a través de la app móvil, 3) Contactar con atención al cliente, 4) Utilizar los métodos de pago alternativos disponibles.'
      },
      {
        question: '¿Cómo cambio el IBAN de mi cuenta bancaria?',
        answer: 'Para modificar tu IBAN: 1) Entra en tu área de cliente, 2) Accede a "Gestión de facturación", 3) Selecciona "Cambiar cuenta bancaria", 4) Introduce y verifica el nuevo IBAN.'
      }
    ]
  },
  {
    id: 'instalacion',
    title: 'Instalación y Soporte Técnico',
    icon: Wrench,
    faqs: [
      {
        question: '¿Cuánto tarda la instalación?',
        answer: 'La instalación se realiza en 5-7 días laborables desde la confirmación del pedido.'
      },
      {
        question: '¿Qué hago si tengo problemas técnicos?',
        answer: 'Contacta con nuestro soporte técnico 24/7 para resolver cualquier incidencia.'
      }
    ]
  }
];

export default function AyudaPage() {
  const [activeSectionId, setActiveSection] = useState('atencion');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const questionsPerPage = 10;

  const getCurrentPageFaqs = (faqs: Array<{ question: string; answer: string }>) => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return faqs.slice(startIndex, endIndex);
  };

  const getPageCount = (faqs: Array<{ question: string; answer: string }>) => {
    return Math.ceil(faqs.length / questionsPerPage);
  };

  const activeSection = helpSections.find(section => section.id === activeSectionId);
  const totalPages = activeSection ? getPageCount(activeSection.faqs) : 1;

  return (
    <main className="pt-total-nav min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-new opacity-95" />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Centro de Ayuda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Estamos aquí para ayudarte. Encuentra respuestas rápidas o contacta con nuestro equipo de soporte.
          </motion.p>
        </div>
      </section>

      {/* Help Resources Grid - More Compact */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <resource.icon size={24} weight="duotone" className="text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                  </div>
                </div>
                <Link
                  href={resource.link}
                  className="mt-3 inline-block bg-gradient-new text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
                >
                  {resource.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Sections with Pills/Dropdown */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Dropdown */}
          <div className="sm:hidden flex justify-center mb-12">
            <div className="w-full max-w-[300px]">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-gradient-new text-white rounded-xl p-3 shadow-md flex items-center justify-between gap-2 text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  {activeSection?.icon && (
                    <activeSection.icon size={20} weight="duotone" className="text-white" />
                  )}
                  <span>{activeSection?.title || 'Seleccionar categoría'}</span>
                </div>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute mt-2 w-full max-w-[300px] bg-white rounded-xl shadow-lg overflow-hidden z-10">
                  <div className="py-2 px-2">
                    {helpSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 py-2.5 px-4 text-sm font-medium transition-colors rounded-lg ${
                          activeSectionId === section.id
                            ? 'bg-gradient-new text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <section.icon size={18} weight="duotone" />
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Pills */}
          <div className="hidden sm:flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-md">
              <div className="flex flex-row gap-2">
                {helpSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSectionId === section.id
                        ? 'bg-gradient-new text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon size={20} weight="duotone" />
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section for Active Category */}
          <motion.div
            key={`${activeSectionId}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              {activeSection && getCurrentPageFaqs(activeSection.faqs).map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Anterior
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-gradient-new text-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">
                ¿No encuentras lo que buscas?
              </p>
              <Link
                href="#contacto"
                className="inline-block bg-gradient-new text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-[#80c4cc]/30 hover:-translate-y-1"
              >
                Contacta con nosotros
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 