import ClientForm from "./ClientsForm";

function HomePage() {
  return (
    <body>
      <div>
        <h1>Company Home</h1>
        <ul>
          <li>Service Hours: 24h;</li>
          <li>Email: lauderingcloathes@gmail.com;</li>
          <li>Phone: (12) 34567894</li>
        </ul>
      </div>

      <div>
        <ClientForm />
      </div>
    </body>
  );
}

export default HomePage;
