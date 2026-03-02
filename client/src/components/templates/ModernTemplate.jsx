import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({
  data,
  accentColor = "#2563eb",
  removeBackground,
}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header
        className="p-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-light mb-3">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="size-4" />
              <span className="break-all text-xs">
                {data.personal_info.linkedin}
              </span>
            </a>
          )}

          {data.personal_info?.website && (
            <a
              href={data.personal_info.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Globe className="size-4" />
              <span className="break-all text-xs">
                {data.personal_info.website}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-8">
            <h2
              className="text-2xl font-light mb-4 pb-2 border-b"
              style={{ borderColor: accentColor }}
            >
              Professional Summary
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-2xl font-light mb-6 pb-2 border-b"
              style={{ borderColor: accentColor }}
            >
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-medium">{exp.position}</h3>
                      <p style={{ color: accentColor }}>{exp.company}</p>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="leading-relaxed mt-3 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ ADDED PROJECTS SECTION */}
        {data.projects?.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-2xl font-light mb-6 pb-2 border-b"
              style={{ borderColor: accentColor }}
            >
              Projects
            </h2>

            <div className="space-y-6">
              {data.projects.map((proj, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {proj.name}
                  </h3>

                  {proj.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education + Skills */}
        {(data.education?.length > 0 || data.skills?.length > 0) && (
          <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-16">
              {/* LEFT — Education */}
              {data.education?.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-light mb-6 pb-2 border-b"
                    style={{ borderColor: accentColor }}
                  >
                    Education
                  </h2>

                  <div className="space-y-6">
                    {data.education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} {edu.field && `in ${edu.field}`}
                        </h3>

                        <p style={{ color: accentColor }}>{edu.institution}</p>

                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>{formatDate(edu.graduation_date)}</span>
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RIGHT — Skills */}
              {data.skills?.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-light mb-6 pb-2 border-b"
                    style={{ borderColor: accentColor }}
                  >
                    Skills
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm text-white rounded-full"
                        style={{ backgroundColor: accentColor }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;