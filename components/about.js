export default function About() {
    return (
        <div className="gap-2 grid">
            {/* <Back /> */}
            <h2>About StegaMark</h2>
            <p className="">StegaMark is...</p>
            <ul className="list-disc list-inside pl-8">
                <li>
                    an ongoing research project with the goal of preserving the
                    stories behind our images, to supporting a more sustainable
                    human-AI content ecosystem.
                </li>
                <li>
                    started by Shm Garanganao Almeda (advised by Bjoern
                    Hartmann), Franz Kieviet, Jesus Villalobos, Kathir Kannan,
                    Tiffany Wang, and Cristian Moran.
                </li>
                <li>
                    created as a class final group project for{" "}
                    <a href="https://rdi.berkeley.edu/responsible-genai/f23">
                        CS294/194-196: Responsible GenAI and Decentralized
                        Intelligence
                    </a>{" "}
                    taught by Professor Dawn Song in Fall 2023 at UC Berkeley
                </li>
            </ul>

            <p>Future Goals:</p>
            <ul className="list-disc list-inside pl-8">
                <li>multiple download options</li>
                <li>decentralizing the directory system</li>
                <li>community record &quot;editing&quot;</li>
            </ul>
        </div>
    );
}
