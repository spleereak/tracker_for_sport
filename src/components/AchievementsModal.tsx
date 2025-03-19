import { Achievement } from "@/types/types";
import { X, Trophy, Lock } from "lucide-react";

export const AchievementsModal: React.FC<{
  achievements: Achievement[];
  onClose: () => void;
}> = ({ achievements, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden relative"
      >
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">Достижения</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-4 bg-gradient-to-b from-gray-50 to-white border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Прогресс достижений</span>
            <span className="text-sm font-bold text-gray-900">
              {achievements.filter(a => a.completed).length}/{achievements.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ 
                width: `${(achievements.filter(a => a.completed).length / achievements.length) * 100}%` 
              }}
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`
                  relative group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg
                  ${achievement.completed ? 'bg-gradient-to-br from-purple-50 to-blue-50' : 'bg-gray-50'}
                `}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.completed ? (
                      <Trophy className="w-6 h-6 text-purple-500 shrink-0" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400 shrink-0" />
                    )}
                  </div>

                  {achievement.completed ? (
                    <div
                      className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      Выполнено
                    </div>
                  ) : (
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
                      В процессе
                    </div>
                  )}

                  <div 
                    className={`absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12 rounded-full 
                    ${achievement.completed ? 'bg-purple-200/20' : 'bg-gray-200/20'}`}
                  />
                  <div 
                    className={`absolute bottom-0 left-0 w-16 h-16 transform -translate-x-8 translate-y-8 rounded-full 
                    ${achievement.completed ? 'bg-blue-200/20' : 'bg-gray-200/20'}`}
                  />
                </div>

                {achievement.completed && (
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
