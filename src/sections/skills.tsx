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
          id
          logo {
            childImageSharp {
              resize(width: 150) {
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
  const formatExperience = (start: string) => {
    const experienceInYears = (new Date().getTime() - new Date(start).getTime()) / oneYearInMs;

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
                <div
                  key={idx2}
                  className={`skill col-sm-${12 / skillChunk.length} animated delay-${idx1 + idx2}s`}
                  style={{ maxWidth: '200px' }}
                >
                  <div className="p-4">
                    <ResponsiveImage name={skill.name} {...skill.logo} />
                    <span>{formatExperience(skill.startDate)}</span>
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
