import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* Navbar */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-gray-900">
        <h1 className="text-white font-bold text-xl">
          BodyMap <span className="text-teal-400">3D</span>
        </h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-block bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          🩺 Your personal health tracker
        </div>
        <h2 className="text-5xl font-bold text-white leading-tight max-w-3xl mb-6">
          Track Pain & Symptoms on a <span className="text-teal-400">3D Body Model</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Click directly on a 3D model of your body to log symptoms, track severity over time, and understand your health patterns visually.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-lg"
          >
            Start Tracking Free
          </button>
          {/* <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-lg"
          >
            View Demo
          </button> */}
        </div>
      </div>

      {/* Features */}
      <div className="px-8 py-16 border-t border-gray-900">
        <h3 className="text-white text-2xl font-bold text-center mb-12">
          Everything you need to track your health
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: '🫀',
              title: '3D Body Interaction',
              desc: 'Click directly on a realistic 3D human model to pinpoint exactly where you feel pain or discomfort.',
            },
            {
              icon: '📊',
              title: 'Severity Tracking',
              desc: 'Log severity from 1-10 with visual color coding. Green for mild, yellow for moderate, red for severe.',
            },
            {
              icon: '📅',
              title: 'Health History',
              desc: 'Track symptoms over time and identify patterns with your personal health log and summary stats.',
            },
            {
              icon: '⚧',
              title: 'Male & Female Models',
              desc: 'Choose between anatomically accurate male and female 3D body models during registration.',
            },
            {
              icon: '🔐',
              title: 'Private & Secure',
              desc: 'Your health data is private. JWT authentication ensures only you can access your symptom logs.',
            },
            {
              icon: '✏️',
              title: 'Edit & Delete Logs',
              desc: 'Update or remove symptom logs at any time. Full control over your personal health data.',
            },
          ].map(f => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="text-white font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 py-16 border-t border-gray-900 text-center">
        <h3 className="text-white text-3xl font-bold mb-4">
          Ready to understand your body better?
        </h3>
        <p className="text-gray-400 mb-8">Join and start logging symptoms in under 60 seconds.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-10 py-3 rounded-xl transition-colors text-lg"
        >
          Create Free Account
        </button>
      </div>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-gray-900 text-center">
        <p className="text-gray-600 text-sm">
          Built with React, Three.js, Node.js & MongoDB By Navaneeth Maruthi. &copy; 2026
        </p>
      </footer>

    </div>
  );
}