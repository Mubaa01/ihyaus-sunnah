import { Link } from "react-router-dom"
import {
  FaHandHoldingHeart,
  FaMosque,
  FaUsers,
  FaBookOpen,
  FaArrowRight,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa"
import QuranVersePanel from "../../components/common/QuranVersePanel"

const donateVerse = {
  arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ",
  translation:
    "Those who spend in Allah's way are like a seed that grows seven ears.",
  reference: "Surah Al-Baqarah 2:261",
}

const DonatePage = () => {
  const donationCategories = [
    {
      title: "Sponsor a Tahfeez Student",
      amount: "₦15,000 / Month",
      description:
        "Support Qur'an memorization students with books, feeding, and educational care.",
      image:
        "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Feed a Family",
      amount: "₦25,000",
      description:
        "Provide monthly food assistance for vulnerable families and orphans.",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Build Islamic Education",
      amount: "Flexible",
      description:
        "Help improve classrooms, books, and educational infrastructure.",
      image:
        "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "General Sadaqah",
      amount: "Any Amount",
      description:
        "Support all ongoing da’wah, education, and welfare projects.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  const impactStats = [
    { number: "500+", label: "Students Supported" },
    { number: "120+", label: "Huffaz Trained" },
    { number: "300+", label: "Families Assisted" },
    { number: "8+", label: "Years of Service" },
  ]

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
          alt="Donate Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/60" />

        <div className="relative container-custom flex min-h-[85vh] items-center py-24">
          <div className="max-w-4xl text-white">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <FaHandHoldingHeart className="text-yellow-400" />
              <span className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                Support • Sadaqah • Impact
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-heading font-bold leading-tight md:text-7xl">
              Support Knowledge & Community Development
            </h1>

            <p className="hidden mb-5 text-2xl font-arabic text-yellow-400" dir="rtl">
              مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ
            </p>

            <p className="hidden mb-8 text-xl text-gray-200">
              “The example of those who spend their wealth in the way of Allah
              is like a seed that grows seven ears...”
            </p>

            <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
              Your donation helps us educate students, support vulnerable
              families, spread authentic Islamic knowledge, and build a stronger
              community rooted in sincerity and service.
            </p>

            <QuranVersePanel {...donateVerse} className="mt-8 max-w-3xl" />

            <div className="mt-10 flex flex-wrap gap-5">
              <button className="btn-primary flex items-center gap-3">
                Donate Now
                <FaArrowRight />
              </button>

              <button className="btn-outline">
                Sponsor a Student
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="relative z-10 -mt-16 pb-10">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-[2rem] border border-white/20 p-8 text-center shadow-premium backdrop-blur-xl"
              >
                <h3 className="mb-2 text-5xl font-bold text-yellow-400">
                  {stat.number}
                </h3>

                <p className="text-lg font-medium text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION CATEGORIES */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <span className="section-subtitle">
              Donation Categories
            </span>

            <h2 className="section-title">
              Choose Where Your Contribution Goes
            </h2>

            <p className="section-description mx-auto max-w-3xl">
              Every contribution supports meaningful projects that benefit
              students, families, and the wider Muslim community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {donationCategories.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-soft transition-all duration-500 hover:-translate-y-3 hover:shadow-premium"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-6 left-6">
                    <div className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-primary">
                      {item.amount}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="mb-4 text-3xl font-heading font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="mb-8 leading-relaxed text-gray-600">
                    {item.description}
                  </p>

                  <button className="btn-primary flex items-center gap-3">
                    Donate Now
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DONATE */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469571486292-b53601010376?q=80&w=1400&auto=format&fit=crop"
                alt="Community"
                className="rounded-[2rem] shadow-premium"
              />

              <div className="absolute -bottom-8 -right-8 rounded-[2rem] bg-primary p-8 text-white shadow-premium">
                <h4 className="text-4xl font-bold text-yellow-400">100%</h4>
                <p className="mt-2 text-gray-200">
                  Transparent Community Projects
                </p>
              </div>
            </div>

            <div>
              <span className="section-subtitle">
                Why Support Us
              </span>

              <h2 className="section-title">
                Building Impact Through Knowledge & Compassion
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                We are committed to transparency, sincerity, and sustainable
                community development through education, welfare support, and
                authentic Islamic learning.
              </p>

              <div className="space-y-5">
                {[
                  "Transparent and accountable projects",
                  "Support for students and vulnerable families",
                  "Long-term educational development",
                  "Qualified teachers and structured programs",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl bg-cream p-5"
                  >
                    <div className="mt-1 text-secondary">
                      <FaCheckCircle />
                    </div>

                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <span className="section-subtitle text-yellow-400">
              Payment Methods
            </span>

            <h2 className="mx-auto max-w-4xl text-4xl font-heading font-bold leading-tight md:text-6xl">
              Secure & Convenient Donations
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                bank: "Jaiz Bank",
                accountName: "Ihyaus Sunnah Foundation",
                accountNumber: "1234567890",
              },

              {
                bank: "Opay",
                accountName: "Ihyaus Sunnah Foundation",
                accountNumber: "08031234567",
              },
            ].map((item) => (
              <div
                key={item.bank}
                className="glass-card rounded-[2rem] border border-white/20 p-8"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-primary">
                    <FaMosque />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {item.bank}
                    </h3>

                    <p className="text-gray-300">
                      Donation Account
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="mb-1 text-sm text-yellow-400">
                      Account Name
                    </p>

                    <h4 className="text-xl font-semibold">
                      {item.accountName}
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="mb-1 text-sm text-yellow-400">
                      Account Number
                    </p>

                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-bold tracking-widest">
                        {item.accountNumber}
                      </h4>

                      <button className="rounded-xl bg-yellow-400 p-3 text-primary transition hover:scale-105">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-cream py-28">
        <div className="container-custom text-center">
          <span className="section-subtitle">
            Continue the Reward
          </span>

          <h2 className="mx-auto mb-6 max-w-4xl text-4xl font-heading font-bold leading-tight text-primary md:text-6xl">
            Invest in Knowledge That Benefits Generations
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-600">
            Your contribution today becomes ongoing charity that continues to
            benefit students, families, and the community for years to come.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="btn-primary flex items-center gap-3">
              Donate Now
              <FaArrowRight />
            </button>

            <Link to="/contact">
              <button className="btn-dark-outline">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DonatePage
