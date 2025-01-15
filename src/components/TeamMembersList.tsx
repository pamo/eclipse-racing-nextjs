import Image from "next/image";
import { urlFor, SanityImageSource } from "@/lib/sanity";

interface TeamMember {
  _id: string;
  name: string;
  yearJoined: number;
  bio: string;
  image?: SanityImageSource;
}

function getColorClasses(index: number) {
  switch (index % 3) {
    case 0:
      return {
        border: "border-eclipse-blue-dark",
        shadow: "bg-eclipse-blue-dark",
        text: "text-eclipse-blue-dark",
        lightText: "text-eclipse-blue-light",
      };
    case 1:
      return {
        border: "border-eclipse-pink-dark",
        shadow: "bg-eclipse-pink-dark",
        text: "text-eclipse-pink-dark",
        lightText: "text-eclipse-pink-light",
      };
    case 2:
      return {
        border: "border-eclipse-green-dark",
        shadow: "bg-eclipse-green-dark",
        text: "text-eclipse-green-dark",
        lightText: "text-eclipse-green-light",
      };
  }
}

export default function TeamMembersList({
  members,
}: {
  members: TeamMember[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => {
        const colorClasses = getColorClasses(index)!;
        return (
          <div
            key={member._id}
            className={`bg-white rounded-lg border-2 relative transition-all duration-300 hover:translate-x-1 hover:translate-y-1 group
            ${colorClasses.border}`}
          >
            {/* Solid shadow */}
            <div
              className={`absolute inset-0 ${colorClasses.shadow} rounded-lg transform translate-x-2 translate-y-2 -z-10`}
            ></div>

            <div className="bg-white p-6 rounded-lg">
              {member.image && (
                <div
                  className={`w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 ${colorClasses.border}`}
                >
                  <Image
                    src={urlFor(member.image).width(128).height(128).url()}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <h2
                className={`text-xl font-bold ${colorClasses.text} mb-2 text-center`}
              >
                {member.name}
              </h2>
              <p className={`${colorClasses.lightText} text-center mb-4`}>
                Joined in {member.yearJoined}
              </p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
