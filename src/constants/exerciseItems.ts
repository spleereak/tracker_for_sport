type DifficultyLevel = 'Начинающий' | 'Средний' | 'Сложный';
type EquipmentType = 'Штанга' | 'Гантели' | 'Скакалка' | 'Коврик' | 'Скамья' | 'Турник' | 'Ничего';
type ExerciseTag = 'Ноги' | 'Руки' | 'Спина' | 'Грудь' | 'Корпус' | 'Кардио';

const DIFFICULTY_LEVELS: DifficultyLevel[] = ['Начинающий', 'Средний', 'Сложный'];
const EQUIPMENT_TYPES: EquipmentType[] = ['Штанга', 'Гантели', 'Скакалка', 'Коврик', 'Скамья', 'Турник', 'Ничего'];
const EXERCISE_TAGS: ExerciseTag[] = ['Ноги', 'Руки', 'Спина', 'Грудь', 'Корпус', 'Кардио'];

export { DIFFICULTY_LEVELS, EQUIPMENT_TYPES, EXERCISE_TAGS, type DifficultyLevel, type EquipmentType, type ExerciseTag }