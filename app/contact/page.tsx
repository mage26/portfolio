import Title from "@/components/Title";

export default function Contact() {
    return (
        <section className="relative flex justify-center gap-8 w-full max-w-6xl flex-col">
            <Title Element="h1" className="block uppercase text-4xl font-black text-center">LET&apos;S CONNECT</Title>
            <div className="text-center">
                <h2>Benjamin Berlin</h2>
                <p><a href="mailto:bberlin26@gmail.com">bberlin26@gmail.com</a></p>
                <p><a href="http://www.linkedin.com/in/benberlin" target="_blank">Add me on LinkedIn</a></p>
                <p><a href="https://github.com/mage26" target="_blank">See my GitHub</a></p>
                <p><a href="http://benberlinfrontend.com/BenjaminBerlinResume.pdf">Download my resume</a></p>
            </div>
        </section>
    )
}