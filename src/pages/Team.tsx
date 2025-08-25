import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import teamMembersk from "@/assets/teamdata/teamdata.json";
import {
  Users,
  Discord,
  Linkedin,
  Github,
  Instagram,
  Code,
  Heart,
  Mail,
  X,
} from "@/components/icons";

/**
 * Interface for team member data structure
 * Ensures type safety and consistency across the component
 */
interface TeamMember {
  id: string;
  name: string;
  subname?: string;
  role?: string;
  email: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  discord?: string;
  avatar?: string;
  bio?: string;
  isFounder?: boolean;
  department?: string;
  twitter?: string;
}

/**
 * Interface for social link structure
 * Standardizes social media link handling
 */
interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
}

const Team = () => {
  // State for managing loading states and interactions
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  /**
   * Core team members data
   * Contains all team member information with exact details as provided
   */
  
  const teamMembers: TeamMember[] = teamMembersk

  /**
   * Generates social media links for a team member
   * @param member - The team member object
   * @returns Array of social link objects
   */
  const getSocialLinks = (member: TeamMember): SocialLink[] => {
    const links: SocialLink[] = [];

    // Email link (always present)
    if (member.email) {
      links.push({
        platform: "Email",
        url: `mailto:${member.email}`,
        icon: Mail,
        color: "text-blue-400 hover:text-blue-300",
      });
    }

    // GitHub link
    if (member.github) {
      links.push({
        platform: "GitHub",
        url: member.github,
        icon: Github,
        color: "text-gray-300 hover:text-white",
      });
    }

    // LinkedIn link
    if (member.linkedin) {
      links.push({
        platform: "LinkedIn",
        url: member.linkedin,
        icon: Linkedin,
        color: "text-blue-400 hover:text-blue-300",
      });
    }

    // Instagram link
    if (member.instagram) {
      links.push({
        platform: "Instagram",
        url: member.instagram,
        icon: Instagram,
        color: "text-pink-400 hover:text-pink-300",
      });
    }

    // Twitter link
    if (member.twitter) {
      links.push({
        platform: "Twitter",
        url: member.twitter,
        icon: X,
        color: "text-gray-200 hover:text-gray-100"
      });
    }


    // Discord link
    if (member.discord) {
      links.push({
        platform: "Discord",
        url: member.discord,
        icon: Discord,
        color: "text-indigo-400 hover:text-indigo-300",
      });
    }

    return links;
  };
  const handleImageError = (memberId: string) => {
    setImageErrors((prev) => ({ ...prev, [memberId]: true }));
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-300 text-sm font-medium">Meet Our Amazing Team</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="text-white">Meet Our </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
              The passionate visionaries, builders, and creators behind ZenYukti's mission to 
              democratize tech education and build inclusive learning communities.
            </p>

            {/* Enhanced Stats Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "13+", label: "Team Members", icon: Users, color: "from-purple-500 to-pink-500" },
                { number: "5+", label: "Specialized Domains", icon: Target, color: "from-cyan-500 to-blue-500" },
                { number: "600+", label: "Community Members", icon: Zap, color: "from-pink-500 to-purple-500" },
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="group">
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ZenBoard - The Initiators */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
                <span className="text-purple-300 font-semibold">ZenBoard</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                The Initiators
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Meet the visionaries who started ZenYukti with a dream to make
                tech education accessible to all.
              </p>
            </div>

            {/* Founders Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Anvita Shukla - Co-founder */}
              <div className="order-2 md:order-1">
                {(() => {
                  const anvita = teamMembers.find(member => member.id === "anvita-shukla");
                  if (!anvita) return null;
                  return (
                    <div className="group">
                      <div className="relative bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-500/20 rounded-3xl p-8 hover:border-pink-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 mx-auto mb-6 relative">
                            {!imageErrors[anvita.id] && anvita.avatar ? (
                              <img
                                src={anvita.avatar}
                                alt={`${anvita.name} - Co-founder`}
                                className="w-full h-full rounded-full object-cover border-4 border-pink-400/50 group-hover:border-pink-400 transition-all duration-300"
                                onError={() => handleImageError(anvita.id)}
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-pink-400/50">
                                {getInitials(anvita.name)}
                              </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                              <Heart className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2">{anvita.name}</h3>
                          <p className="text-lg text-pink-300 mb-4 font-semibold">{anvita.role}</p>
                          {anvita.bio && (
                            <p className="text-gray-300 mb-6 italic leading-relaxed">{anvita.bio}</p>
                          )}

                          <div className="flex justify-center space-x-3">
                            {getSocialLinks(anvita).map((social, idx) => {
                              const IconComponent = social.icon;
                              return (
                                <a
                                  key={idx}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                                >
                                  <IconComponent className="w-5 h-5 text-white" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Main Founder - Ayush Hardeniya */}
              <div className="order-1 md:order-2">
                {teamMembers
                  .filter((member) => member.isFounder)
                  .map((founder) => (
                    <div key={founder.id} className="group">
                      <div className="relative bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        
                        <div className="relative z-10 text-center">
                          <div className="w-40 h-40 mx-auto mb-8 relative">
                            {!imageErrors[founder.id] && founder.avatar ? (
                              <img
                                src={founder.avatar}
                                alt={`${founder.name} - Founder`}
                                className="w-full h-full rounded-full object-cover border-4 border-purple-400/50 group-hover:border-purple-400 transition-all duration-300"
                                onError={() => handleImageError(founder.id)}
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-purple-400/50">
                                {getInitials(founder.name)}
                              </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          <h3 className="text-3xl font-bold text-white mb-2">{founder.name}</h3>
                          {founder.subname && (
                            <h6 className="text-lg text-gray-300 mb-3">{founder.subname}</h6>
                          )}
                          <p className="text-xl text-purple-300 mb-4 font-semibold">{founder.role}</p>
                          {founder.bio && (
                            <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">{founder.bio}</p>
                          )}

                          <div className="flex justify-center space-x-4">
                            {getSocialLinks(founder).map((social, idx) => {
                              const IconComponent = social.icon;
                              return (
                                <a
                                  key={idx}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                                >
                                  <IconComponent className="w-6 h-6 text-white" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Avinash Shukla - Co-founder */}
              <div className="order-3 md:order-3">
                {(() => {
                  const avinash = teamMembers.find(member => member.id === "avinash-shukla");
                  if (!avinash) return null;
                  return (
                    <div className="group">
                      <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 mx-auto mb-6 relative">
                            {!imageErrors[avinash.id] && avinash.avatar ? (
                              <img
                                src={avinash.avatar}
                                alt={`${avinash.name} - Co-founder`}
                                className="w-full h-full rounded-full object-cover border-4 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300"
                                onError={() => handleImageError(avinash.id)}
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-cyan-400/50">
                                {getInitials(avinash.name)}
                              </div>
                            )}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                              <Heart className="w-5 h-5 text-white" />
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2">{avinash.name}</h3>
                          <p className="text-lg text-cyan-300 mb-4 font-semibold">{avinash.role}</p>
                          {avinash.bio && (
                            <p className="text-gray-300 mb-6 italic leading-relaxed">{avinash.bio}</p>
                          )}

                          <div className="flex justify-center space-x-3">
                            {getSocialLinks(avinash).map((social, idx) => {
                              const IconComponent = social.icon;
                              return (
                                <a
                                  key={idx}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                                >
                                  <IconComponent className="w-5 h-5 text-white" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ZenCrew - The Core Team */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-6">
                <span className="text-indigo-300 font-semibold">ZenCrew</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                The Core Team
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                The dedicated individuals working together to build and grow the
                ZenYukti community.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers
                .filter((member) => !member.isFounder && member.department === "ZenCrew")
                .map((member, index) => (
                  <div key={member.id} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-indigo-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 relative">
                          {!imageErrors[member.id] && member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={`${member.name} profile`}
                              className="w-full h-full rounded-full object-cover border-2 border-indigo-400/30 group-hover:border-indigo-400 transition-all duration-300"
                              onError={() => handleImageError(member.id)}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-sm text-indigo-300 mb-4 font-medium">{member.role}</p>

                        <div className="flex justify-center space-x-2">
                          {getSocialLinks(member).map((social, idx) => {
                            const IconComponent = social.icon;
                            return (
                              <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                              >
                                <IconComponent className="w-4 h-4 text-white" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ZenMates - The Action Team */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/20"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                <span className="text-emerald-300 font-semibold">ZenMates</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                The Action Team
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                The hands-on crew that makes sure ideas don't just stay ideas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers
                .filter((member) => member.department === "ZenMates")
                .map((member, index) => (
                  <div key={member.id} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 relative">
                          {!imageErrors[member.id] && member.avatar ? (
                            <img
                              src={member.avatar}
                              alt={`${member.name} profile`}
                              className="w-full h-full rounded-full object-cover border-2 border-emerald-400/30 group-hover:border-emerald-400 transition-all duration-300"
                              onError={() => handleImageError(member.id)}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg font-bold">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-sm text-emerald-300 mb-4 font-medium">{member.role}</p>

                        <div className="flex justify-center space-x-2">
                          {getSocialLinks(member).map((social, idx) => {
                            const IconComponent = social.icon;
                            return (
                              <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                              >
                                <IconComponent className="w-4 h-4 text-white" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                What Drives Us
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                The core values and principles that guide our team in everything we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "We believe great things happen when diverse minds work together toward a common goal.",
                  gradient: "from-blue-500 to-purple-600",
                },
                {
                  icon: Heart,
                  title: "Inclusivity",
                  description: "Everyone deserves equal opportunities to learn, grow, and contribute to the tech community.",
                  gradient: "from-pink-500 to-red-600",
                },
                {
                  icon: Code,
                  title: "Innovation",
                  description: "We constantly push boundaries and explore new ways to make tech education more accessible.",
                  gradient: "from-green-500 to-cyan-600",
                },
              ].map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="group">
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                      <div className={`w-20 h-20 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Join Team CTA */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Want to Join Our Team?
                  </h2>
                  <p className="text-white/90 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
                    We're always looking for passionate individuals who share our
                    vision of building collaborately and growing together. Join us in making a
                    difference!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                      href="mailto:teamzenyukti@gmail.com"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Us
                    </a>

                    <a
                      href="https://discord.gg/HuBa9r33kW"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Discord className="w-5 h-5 mr-2" />
                      Join Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Team;