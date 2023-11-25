export default function About() {
  return (
      <div className="gap-2 grid">
          <h1>About StegaMark</h1>
          <p className="">StegaMark is...</p>
          <ul className="list-disc list-inside pl-8">
              <li>
                  An ongoing research project with the goal of preserving the
                  stories behind our images, to supporting a more sustainable
                  human-AI content ecosystem
              </li>
              <li>
                  Started by Shm Garanganao Almeda, Tiffany Wang, Franz Kieviet, Jesus Villalobos, Kathir Kannan, Cristian Moran
              </li>
              <li>
                  Created as a class final group project for{" "}
                  <a href="https://rdi.berkeley.edu/responsible-genai/f23">
                      CS294/194-196: Responsible GenAI and Decentralized
                      Intelligence
                  </a>{" "}
                  taught by Professor Dawn Song in Fall 2023 at UC Berkeley
              </li>
          </ul>

          <p>Future Goals:</p>
          <ul className="list-disc list-inside pl-8">
              <li>Multiple download options</li>
              <li>Decentralizing the directory system</li>
              <li>Community record &quot;editing&quot;</li>
          </ul>
      </div>
  );
}
