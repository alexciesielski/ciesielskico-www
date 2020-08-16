import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ResponsiveImage from '../components/responsive-image';
import Section from '../components/section';
import { ISkill } from '../components/skill';

const Skills: React.FC<{}> = ({}) => {
  const { allStrapiSkills } = useStaticQuery(graphql`
    query SkillsQuery {
      allStrapiSkills {
        nodes {
          name
          startDate
          endDate
          id
          logo {
            childImageSharp {
              sizes(maxHeight: 150) {
                src
              }
            }
          }
        }
      }
    }
  `);

  const skills = allStrapiSkills.nodes as ISkill[];
  const skillCount = skills.length;
  const defaultChunksize = 3;
  const chunkSize = skillCount % 5 === 0 ? 5 : skillCount % 4 === 0 ? 4 : skillCount % 3 === 0 ? 3 : defaultChunksize;
  const skillChunks = skills
    .map((_, index) => skills.slice(index * chunkSize, (index + 1) * chunkSize))
    .filter((arr) => arr.length > 0);

  const oneYearInMs = 1000 * 3600 * 24 * 365;
  const formatExperience = (start: string, end?: string) => {
    const diffMs = end
      ? new Date().getTime() - new Date(end).getTime() - new Date(start).getTime()
      : new Date().getTime() - new Date(start).getTime();

    const experienceInYears = diffMs / oneYearInMs;

    if (experienceInYears < 1) {
      return `< 1 year`;
    }

    return `over ${Math.ceil(experienceInYears)} years`;
  };

  return (
    <Section header="What I've worked with" height="small">
      <div className="animated">
        {skillChunks.map((skillChunk, idx1) => (
          <div className="clients row mt-4 align-items-center justify-content-around" key={idx1}>
            {skillChunk
              .filter((skill) => skill.logo)
              .sort((a, b) => a.startDate.localeCompare(b.startDate))
              .map((skill, idx2) => (
                <div key={idx2} className={`skill col-sm-${12 / skillChunk.length} animated delay-${idx1 + idx2}s`}>
                  <div className="p-4">
                    <div>
                      <ResponsiveImage name={skill.name} {...skill.logo} />
                    </div>
                    <div className="p-2">{formatExperience(skill.startDate, skill.endDate)}</div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
