import { WaitlistForm } from "./components/WaitlistForm";

const HERO_IMAGE =
  "https://images.pexels.com/photos/9617649/pexels-photo-9617649.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const FEATURES = [
  {
    title: "Simple by design",
    body: "Everything you need, nothing you don't. A clean experience from the first click.",
  },
  {
    title: "Built around you",
    body: "Shaped by the people who will use it every day, so it fits how you already work.",
  },
  {
    title: "Ready when you are",
    body: "Be among the first to get access and help us shape what comes next.",
  },
];

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="container site-header__inner">
          <span className="brand">JHARJAL</span>
          <a className="site-header__link" href="#waitlist">
            Join waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero__content">
            <p className="eyebrow">Coming soon</p>
            <h1>Something better is on its way.</h1>
            <p className="hero__lede">
              JHARJAL is almost ready. Leave your email and we'll let you know the moment doors open.
            </p>
            <div id="waitlist">
              <WaitlistForm />
            </div>
          </div>
          <div className="hero__media">
            <img src={HERO_IMAGE} alt="A calm, minimal workspace with a laptop and coffee" />
          </div>
        </section>

        <section className="features container" aria-labelledby="features-heading">
          <h2 id="features-heading" className="section-title">
            Why JHARJAL
          </h2>
          <div className="features__grid">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} JHARJAL. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
