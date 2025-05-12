import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Chatbot from "../pages/Chatbot";
import {
  MessageSquare,
  Shield,
  BarChart,
  CheckCircle,
  Users,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Clock,
  Award,
  MinimizeIcon,
  X,
  MaximizeIcon,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const chatbotRef = useRef(null);

  // Handle clicking outside chatbot to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest("button[data-chatbot-toggle]")
      ) {
        setShowChatbot(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setMinimized(false); // Reset minimized state when toggling
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setMinimized(!minimized);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-zinc-800">
                StudentVoice
              </span>
            </div>
            <div className="hidden md:flex space-x-8 font-semibold">
              <a
                href="#features"
                className="text-zinc-600 hover:text-purple-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-zinc-600 hover:text-purple-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-zinc-600 hover:text-purple-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-zinc-600 hover:text-purple-600 transition-colors"
              >
                FAQ
              </a>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Redesigned with asymmetric layout */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-fuchsia-900 text-white py-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-700 opacity-20 transform rotate-12 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-fuchsia-700 opacity-20 transform -rotate-12 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                Empowering Student Voices
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Your Concerns <span className="text-fuchsia-300">Matter</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100 max-w-lg">
                A modern platform for students to voice concerns and receive
                timely, transparent resolutions from educational institutions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-purple-900 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition group">
                  Register Grievance
                  <ChevronRight className="inline-block ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition">
                  Learn More
                </button>
                <button
                  className="bg-yellow-500 text-white px-6 py-3 rounded-full font-medium hover:bg-yellow-600 transition"
                  onClick={() => setShowChatbot(!showChatbot)}
                >
                  {showChatbot ? "Close Chatbot" : "Chat with Assistant"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section - Redesigned with cards */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Platform Benefits
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Why Choose StudentVoice?
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Our platform reimagines the grievance redressal process with
              modern tools for transparency and accountability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Secure & Confidential
              </h3>
              <p className="text-zinc-600">
                Your identity is protected with end-to-end encryption. Submit
                grievances without fear of repercussions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <BarChart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Real-time Tracking
              </h3>
              <p className="text-zinc-600">
                Monitor the status of your grievance with detailed timeline and
                notifications at every stage.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 hover:border-purple-200 transition-all hover:shadow-purple-100 hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900">
                Guaranteed Response
              </h3>
              <p className="text-zinc-600">
                Every grievance receives a response within 24 hours with
                AI-assisted routing to the right department.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Chatbot */}
        {showChatbot && (
          <div
            ref={chatbotRef}
            className={`fixed z-50 transition-all duration-300 shadow-xl ${
              minimized
                ? "bottom-4 right-4 w-64 h-12 rounded-full"
                : "bottom-4 right-4 w-80 md:w-96 h-[500px] rounded-2xl"
            }`}
          >
            {/* Chatbot Header */}
            <div
              className={`bg-purple-600 flex items-center justify-between px-4 py-3 ${
                minimized ? "rounded-full" : "rounded-t-2xl"
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-white mr-2" />
                <span className="font-medium text-white">
                  Student Assistant
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded focus:outline-none"
                  aria-label={minimized ? "Maximize" : "Minimize"}
                >
                  {minimized ? (
                    <MaximizeIcon className="h-4 w-4" />
                  ) : (
                    <MinimizeIcon className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chatbot Body */}
            {!minimized && (
              <div className="bg-white h-[calc(100%-56px)] rounded-b-2xl flex flex-col">
                <div className="flex-1 p-4 overflow-auto">
                  {/* Chat messages would go here */}
                  <Chatbot />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chatbot Trigger Button (visible when chatbot is closed) */}
        {!showChatbot && (
          <button
            onClick={toggleChatbot}
            className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        )}
      </div>
      
      {/* How It Works - Redesigned with timeline */}
      <div id="how-it-works" className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              A streamlined journey from concern to resolution
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200"></div>

            <div className="space-y-12 md:space-y-0 relative">
              {/* Step 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex md:flex-row-reverse items-center">
                      <span>Register</span>
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3">
                        1
                      </div>
                    </h3>
                    <p className="text-zinc-600">
                      Create an account with your institutional email and verify
                      your student status
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="hidden md:block"></div>
                <div className="mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex items-center">
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3">
                        2
                      </div>
                      <span>Submit</span>
                    </h3>
                    <p className="text-zinc-600">
                      File your grievance with our guided form that ensures all
                      relevant details are included
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex md:flex-row-reverse items-center">
                      <span>Track</span>
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3">
                        3
                      </div>
                    </h3>
                    <p className="text-zinc-600">
                      Monitor progress with real-time updates and communicate
                      directly with handlers
                    </p>
                  </div>
                </div>
                <div className="hidden md:block"></div>
              </div>

              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="hidden md:block"></div>
                <div>
                  <div className="bg-white p-6 rounded-2xl shadow-md inline-block">
                    <h3 className="font-bold text-xl mb-2 text-zinc-900 flex items-center">
                      <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-3">
                        4
                      </div>
                      <span>Resolve</span>
                    </h3>
                    <p className="text-zinc-600">
                      Get resolution confirmation and provide feedback to
                      improve the system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics - Redesigned with gradient cards */}
      <div className="py-20 bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl font-bold mb-4">Making a Difference</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Together we're creating positive change in educational
              institutions
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <div className="text-5xl font-bold mb-2 flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  95%
                </span>
              </div>
              <p className="opacity-80">Resolution Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <div className="text-5xl font-bold mb-2 flex items-center justify-center">
                <Clock className="h-8 w-8 mr-2 text-fuchsia-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  24h
                </span>
              </div>
              <p className="opacity-80">Average Response Time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <div className="text-5xl font-bold mb-2 flex items-center justify-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  5k+
                </span>
              </div>
              <p className="opacity-80">Students Helped</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <div className="text-5xl font-bold mb-2 flex items-center justify-center">
                <Award className="h-8 w-8 mr-2 text-fuchsia-300" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  250+
                </span>
              </div>
              <p className="opacity-80">Partner Institutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Redesigned with modern cards */}
      <div id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Student Testimonials
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Hear from students who have successfully resolved their grievances
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 relative">
              <div className="absolute -top-5 left-8 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "The platform made it easy to communicate my concerns about
                inadequate lab equipment. The administration responded within 24
                hours and the issue was resolved within a week."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Ravi Joshi</h4>
                  <p className="text-zinc-500 text-sm">Engineering Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 relative">
              <div className="absolute -top-5 left-8 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "I was facing issues with my scholarship disbursement. Thanks to
                StudentVoice, I could directly escalate the matter to the right
                department and got it sorted out quickly."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  SP
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Sanya Patel</h4>
                  <p className="text-zinc-500 text-sm">Arts Student</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100 relative">
              <div className="absolute -top-5 left-8 bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <p className="text-zinc-600 mb-6 mt-4">
                "The transparency in the process gave me confidence. I could see
                exactly who was handling my complaint about library access hours
                and when to expect a resolution."
              </p>
              <div className="flex items-center pt-4 border-t border-zinc-100">
                <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  AM
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Ahmed Mirza</h4>
                  <p className="text-zinc-500 text-sm">Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Redesigned with accordion-style */}
      <div id="faq" className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Get answers to common queries about our grievance redressal system
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                Who can register a grievance?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  Any enrolled student with a valid institutional email address
                  can register and submit a grievance. We verify your student
                  status through your institution's database.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                What kinds of issues can I report?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  You can report issues related to academic matters, facilities,
                  discrimination, harassment, financial concerns, or
                  administrative procedures. Our AI-powered system helps
                  categorize and route your concern to the right department.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                How is my privacy protected?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  Your personal information is encrypted and your identity can
                  be kept confidential if requested. We use enterprise-grade
                  security protocols and only authorized personnel can access
                  your details.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 flex items-center">
                <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  Q
                </div>
                What happens after I submit a grievance?
              </h3>
              <div className="pl-11">
                <p className="text-zinc-600">
                  You'll receive an immediate acknowledgment. Your complaint
                  will be assigned to the relevant department head, who must
                  respond within 24 hours with initial feedback. You can track
                  every step of the process in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Redesigned with gradient background */}
      <div className="py-20 bg-gradient-to-br from-purple-900 to-fuchsia-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-700 opacity-20 transform rotate-12 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-fuchsia-700 opacity-20 transform -rotate-12 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            Get Started Today
          </span>
          <h2 className="text-4xl font-bold mb-4">Ready to Be Heard?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who have found their voice and resolved
            their issues through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-medium hover:bg-purple-50 transition group">
              Register Now
              <ChevronRight className="inline-block ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Redesigned with modern layout */}
      <footer className="bg-zinc-900 text-zinc-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Sparkles className="h-6 w-6 text-purple-400" />
                <span className="ml-2 text-xl font-bold text-white">
                  StudentVoice
                </span>
              </div>
              <p className="mb-6 text-zinc-400 max-w-md">
                Empowering students to voice concerns and get timely resolutions
                from educational institutions. Our platform bridges the
                communication gap between students and administration.
              </p>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-purple-400 transition flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-purple-400 transition flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-purple-400 transition flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-purple-400 transition flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Partner Institutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-purple-400 transition flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Contact Us
              </h3>
              <p className="mb-4 text-zinc-400">
                Have questions or need assistance?
              </p>
              <a
                href="mailto:support@studentvoice.edu"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                support@studentvoice.edu
              </a>
              <p className="mt-6 mb-3 text-zinc-400">Download our app:</p>
              <div className="flex space-x-4">
                <button className="bg-zinc-800 text-white text-sm px-4 py-2 rounded-full hover:bg-zinc-700 transition flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.5575 12.0637C17.5883 14.2411 19.4913 15.2344 19.5221 15.2498C19.4989 15.3269 19.1373 16.4615 18.3244 17.6423C17.6342 18.6356 16.9132 19.6212 15.7883 19.6443C14.6943 19.6673 14.3095 18.9925 13.0461 18.9925C11.7826 18.9925 11.3594 19.6212 10.3353 19.6673C9.25648 19.7134 8.40427 18.5942 7.70328 17.6115C6.27189 15.6095 5.17636 11.8485 6.64703 9.35242C7.37721 8.12009 8.65986 7.34524 10.0528 7.32219C11.1006 7.29914 12.0863 8.05089 12.7227 8.05089C13.3591 8.05089 14.5609 7.13675 15.8166 7.29914C16.3992 7.32219 17.4947 7.52686 18.1926 8.39062C18.1232 8.43672 16.7302 9.19771 16.7456 11.0536C16.7302 11.0844 17.5267 11.1074 17.5575 12.0637ZM15.0904 5.6C15.6807 4.88295 16.0731 3.89889 15.9651 2.9C15.1137 2.93686 14.0566 3.44615 13.4355 4.14714C12.8837 4.76423 12.4066 5.77983 12.5301 6.74999C13.4817 6.82751 14.4981 6.31746 15.0904 5.6Z" />
                  </svg>
                  iOS App
                </button>
                <button className="bg-zinc-800 text-white text-sm px-4 py-2 rounded-full hover:bg-zinc-700 transition flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.57164 20.4325C3.38653 20.1274 3.24061 19.8032 3.13388 19.4599C2.89144 18.6301 2.77 17.7704 2.77 16.8908V7.10922C2.77 6.22962 2.89144 5.36993 3.13388 4.54005C3.24061 4.19681 3.38653 3.87259 3.57164 3.56749C3.93409 2.98526 4.46409 2.52212 5.09409 2.23614C5.72409 1.95017 6.43164 1.85255 7.12 1.95017C7.80836 2.04779 8.45756 2.33376 9.00676 2.78778L12 5.07993L14.9932 2.78778C15.5424 2.33376 16.1916 2.04779 16.88 1.95017C17.5684 1.85255 18.2759 1.95017 18.9059 2.23614C19.5359 2.52212 20.0659 2.98526 20.4284 3.56749C20.6135 3.87259 20.7594 4.19681 20.8661 4.54005C21.1086 5.36993 21.23 6.22962 21.23 7.10922V16.8908C21.23 17.7704 21.1086 18.6301 20.8661 19.4599C20.7594 19.8032 20.6135 20.1274 20.4284 20.4325C20.0659 21.0147 19.5359 21.4779 18.9059 21.7639C18.2759 22.0498 17.5684 22.1475 16.88 22.0498C16.1916 21.9522 15.5424 21.6662 14.9932 21.2122L12 18.9201L9.00676 21.2122C8.45756 21.6662 7.80836 21.9522 7.12 22.0498C6.43164 22.1475 5.72409 22.0498 5.09409 21.7639C4.46409 21.4779 3.93409 21.0147 3.57164 20.4325ZM9.00676 18.0405L12 15.7483L14.9932 18.0405C15.2357 18.2358 15.5068 18.3726 15.8068 18.4311C16.1068 18.4897 16.4068 18.4897 16.7068 18.4311C17.0068 18.3726 17.2778 18.2358 17.5203 18.0405C17.7627 17.8452 17.9478 17.591 18.0546 17.3079C18.1613 17.0247 18.2103 16.7221 18.2103 16.4195V7.58148C18.2103 7.27889 18.1613 6.97629 18.0546 6.69314C17.9478 6.40999 17.7627 6.15594 17.5203 5.96069C17.2778 5.76544 17.0068 5.62863 16.7068 5.57009C16.4068 5.51155 16.1068 5.51155 15.8068 5.57009C15.5068 5.62863 15.2357 5.76544 14.9932 5.96069L12 8.25284L9.00676 5.96069C8.76432 5.76544 8.49327 5.62863 8.19327 5.57009C7.89327 5.51155 7.59327 5.51155 7.29327 5.57009C6.99327 5.62863 6.72223 5.76544 6.47979 5.96069C6.23735 6.15594 6.05223 6.40999 5.94549 6.69314C5.83875 6.97629 5.78971 7.27889 5.78971 7.58148V16.4195C5.78971 16.7221 5.83875 17.0247 5.94549 17.3079C6.05223 17.591 6.23735 17.8452 6.47979 18.0405C6.72223 18.2358 6.99327 18.3726 7.29327 18.4311C7.59327 18.4897 7.89327 18.4897 8.19327 18.4311C8.49327 18.3726 8.76432 18.2358 9.00676 18.0405Z" />
                  </svg>
                  Android App
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
            <p className="text-zinc-500">
              &copy; 2025 StudentVoice. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
