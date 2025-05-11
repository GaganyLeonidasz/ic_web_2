import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const backgroundImageUrl = "/img/home_background.jpg";

  return (
    <>
      <style>{`
        .bg-image {
          background-image: url('${backgroundImageUrl}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          color: white;
        }
        .bg-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 0;
        }
        .bg-image > .container {
          position: relative;
          z-index: 1;
        }
        h1, h2, h3 {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
        .card {
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .card-title {
          font-weight: bold;
        }
        .footer {
          background-color: rgba(0, 0, 0, 0.8);
        }
        .card:hover {
          transform: scale(1.05);
           border: none;
  border-radius: 15px; /* Rounded corners */
  transition: transform 0.3s; /* Smooth transition for hover effect */
        }
        

      `}</style>

      <section className="bg-image text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">InterCelestial Webpage</h1>
          <p className="lead">Homepage of the InterCelestial intergalactic war videogame</p>
          <Link href="/auth" className="btn btn-light btn-lg mt-3">Get Started</Link>
        </div>

        <div className="container mt-5">
          <h2 className="fw-bold mb-4">About the Game</h2>
          <p>
            In InterCelestial, players embark on an epic journey across a vast galaxy filled with diverse planets, alien civilizations, and untold treasures. As a commander of a starship, your mission is to conquer the galaxy by engaging in strategic battles, forging alliances, and establishing trade routes.
          </p>
          <p>
            Players will navigate through star systems, each with unique resources and challenges. You can choose to dominate through military might, engaging in tactical space battles against rival factions, or you can opt for a more diplomatic approach, trading valuable resources and technology to build a powerful economy. The choice is yours, and every decision shapes the fate of your empire.
          </p>
        </div>

        <div className="container mt-5">
          <h3 className="fw-bold mb-4">The Story</h3>
          <p>
            In a distant future, humanity has expanded beyond the confines of Earth, colonizing planets across the galaxy. However, this expansion has not gone unchallenged. Various alien races, each with their own cultures and histories, vie for control over the galaxy's resources.
          </p>
          <p>
            The galaxy is divided into several factions, each with its own ambitions and ideologies. The <strong>Galactic Federation</strong> seeks peace and cooperation, while the <strong>Warborn Alliance</strong> believes in strength through conquest. The <strong>Merchant Guild</strong> thrives on trade and commerce, often playing both sides to their advantage.
          </p>
          <p>
            As tensions rise and resources dwindle, a new power emerges: the <strong>InterCelestial Coalition</strong>. Formed by a group of renegade commanders, this coalition aims to unite the galaxy under a single banner, but not without facing fierce opposition from established factions.
          </p>
          <p>
            Players will immerse themselves in this rich lore, making choices that will affect the balance of power in the galaxy. Will you lead your faction to glory through warfare, or will you become a master trader, amassing wealth and influence? The fate of the galaxy lies in your hands in <strong>InterCelestial</strong>.
          </p>
        </div>
        <div className="container mt-5">
          <h3 className="fw-bold mb-4">The Creators</h3>
          <div className="row">
            <div className="col-md-4 mb-4">
            <a 
    href="https://www.instagram.com/nagyonkaracsony" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-decoration-none"
    style={{ color: 'inherit' }}
  >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Gergely Eliot Nagy</h5>
                  <p className="card-text">
                    Main programmer the "mastermind" aka Lester and friend
                  </p>
                </div>
              </div>
              </a>
            </div>
            
            <div className="col-md-4 mb-4">
            <a 
    href="https://www.instagram.com/agagany_" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-decoration-none"
    style={{ color: 'inherit' }}
  >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Ákos Gágány</h5>
                  <p className="card-text">
                    Web programmer, database handler and friend
                  </p>
                </div>
              </div>
              </a>
            </div>
            <div className="col-md-4 mb-4">
            <a 
    href="https://www.instagram.com/huba.herberth" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-decoration-none"
    style={{ color: 'inherit' }}
  >
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">András Huba Herberth</h5>
                  <p className="card-text">
                    Web designer,Soundmaster and friend
                  </p>
                </div>
              </div>
              </a>
            </div>
        </div>
    </div>
    </section>
    <footer className="bg-dark text-light text-center py-4">
        <p className="mb-0">© 2025 InterCelestial. All rights reserved.</p>
    </footer>
  </>
)}