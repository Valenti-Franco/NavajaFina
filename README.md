


  
<p align="center">
  <img src="https://github.com/Valenti-Franco/NavajaFina/assets/94399375/b67628ed-7864-4406-8bb5-ae5bdbd40b30" />
</p>

<h1>NAVAJAFINA</h1>
La plataforma "NavajaFina" representa un sistema de comercio electrónico especializado en productos de barbería. Este sistema proporciona a los usuarios una experiencia de compra en línea completa y eficiente. A través de "NavajaFina", los clientes pueden explorar y adquirir una amplia gama de productos relacionados con la barbería, desde herramientas de corte de alta calidad hasta productos de cuidado facial y capilar.
La autenticación de usuarios en "NavajaFina" se logra mediante un método seguro de autenticación por token JWT (JSON Web Tokens). Esto garantiza que los usuarios puedan acceder a sus cuentas de manera segura y realizar compras de manera conveniente.
Una de las características destacadas de la plataforma es su sección de productos, donde los usuarios pueden explorar detalladamente las características de cada artículo, ver imágenes, puntuar el producto, antes de tomar una decisión de compra. Los usuarios pueden agregar productos a su carrito de compras y, desde allí, realizar el pago de forma individual o conjunta, brindando flexibilidad en el proceso de compra.
Para facilitar aún más la experiencia de compra, "NavajaFina" incorpora un sistema de pago a través de PayPal, una plataforma de pago en línea ampliamente reconocida por su seguridad y confiabilidad.
Además de las funciones de compra, "NavajaFina" ofrece una sección de perfil de usuario, donde los clientes pueden ver y modificar su información personal, incluyendo la posibilidad de cambiar su dirección de correo electrónico. Los usuarios también pueden acceder a un historial completo de sus pedidos y productos favoritos, lo que mejora la experiencia de compra personalizada.
Para los administradores, "NavajaFina" proporciona una sección especial que les permite administrar datos en la base de datos de manera eficiente. Esto incluye la gestión de usuarios, productos, puntos de venta, categorías, subcategorías, imágenes, productos favoritos, historial de compras y órdenes de compra, entre otros elementos clave.
<h1>Imagen de la Arquictetura del Sistema</h1>


![image](https://github.com/Valenti-Franco/NavajaFina/assets/94399375/4f56f282-1fbf-4913-af2a-47da218b3936)
1.	Frontend (Interfaz de Usuario):
•	Los usuarios interactúan con el sistema a través del frontend. Aquí, ingresan su usuario y contraseña para iniciar sesión.
2.	Backend a SQLite (Base de Datos):
•	El backend realiza consultas a la base de datos SQLite para recuperar datos específicos del usuario, como su información de perfil y detalles de compra.
3.	Backend (Servidor de Aplicaciones):
•	Después de que los usuarios ingresan sus credenciales, el backend recibe esta información y genera un token de autenticación asociado con el usuario. El backend también puede realizar consultas en la base de datos para recuperar información específica del usuario.
4.	Frontend a PayPal:
•	Cuando un usuario decide realizar un pago, se comunica con la pasarela de pago de PayPal, proporcionando la información necesaria para la transacción. Esto incluye el token de pago generado por PayPal.
5.	Frontend a Backend:
•	El frontend envía el token de pago al backend, lo que permite al backend saber que se está realizando un pago.
6.	Backend a PayPal:
•	El backend valida el token de pago con PayPal para asegurarse de que sea legítimo y que la transacción pueda proceder. Una vez que se valida el token de pago, PayPal confirma que la transacción puede continuar.
7.	Backend a Frontend:
•	Si la validación del token de pago es exitosa, el backend envía una notificación al frontend para registrar el pago. Esta notificación puede incluir detalles sobre la transacción y confirmación del pago.


<h1> Conclusión sobre "NavajaFina"</h1>

"NavajaFina" es un sistema de comercio electrónico especializado en productos de barbería que destaca por su diseño cuidadoso y sus funcionalidades orientadas a la comodidad del usuario. A lo largo de esta documentación, hemos explorado en detalle cómo el sistema permite a los usuarios registrados explorar, seleccionar y comprar productos de barbería de alta calidad.
En conjunto, "NavajaFina" es un ejemplo de un sistema de comercio electrónico que pone en primer lugar la experiencia del usuario. Ofrece a los clientes una manera segura y cómoda de explorar y comprar productos de barbería, y a los administradores les proporciona las herramientas necesarias para gestionar eficazmente el negocio en línea. 


<h2>Franco Valenti , Maxi Shea , Giuliano Pairone. Matias Malamud, Pablo Alvarez </h2> 
<p align="center">
  <img src="https://media.tenor.com/-oLLBz4z_BYAAAAj/barbershop-haircut.gif" align="center"  width="20%"/>
  <img src="https://media.tenor.com/pyJYzf8463QAAAAj/navaja-beardburys.gif" align="center"  width="50%"/>
  <img src="https://media.tenor.com/-oLLBz4z_BYAAAAj/barbershop-haircut.gif" align="center"  width="20%"/>
  
</p>
