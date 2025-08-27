export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Jake Martin
          </h1>
          <p className="text-xl text-gray-600">
            Full Stack Developer & Creative Technologist
          </p>
        </header>
        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm a passionate developer who loves building beautiful, functional web applications. 
            With expertise in modern web technologies, I create engaging digital experiences 
            that solve real-world problems.
          </p>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'AWS'].map((skill) => (
              <div key={skill} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Portfolio Website</h3>
              <p className="text-gray-600 mb-4">A modern, responsive portfolio built with Next.js</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">React</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-4">More exciting projects on the way!</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">In Progress</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Interested in working together? Let's build something amazing!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Contact Me
          </button>
        </section>
      </div>
    </main>
  )
}
