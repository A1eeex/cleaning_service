
export const calculateCleaningTimeRegular = (
  roomsCount: number,
  bathroomCount: number,
  privateHouse: boolean,
  additionalOption?: number | null
) => {
  const maxWorkTimePerCleaner = 480;
  const minCleaningTime = 60;
  const baseCleaningTimePerRoom = 60;
  const baseCleaningTimePerBathroom = 40;
  const cleaningTimePrivateHouse = privateHouse ? 1.2 : 1;

  const additionalOptionTime = 20;
  const additionalOptionsCount = additionalOptionTime * (additionalOption ?? 1);

  const totalCleaningTimeBase =
    (roomsCount * baseCleaningTimePerRoom +
    bathroomCount * baseCleaningTimePerBathroom) + additionalOptionsCount;

  const totalCleaningTime = totalCleaningTimeBase * cleaningTimePrivateHouse;

  const numberOfCleaners = Math.ceil(totalCleaningTime / maxWorkTimePerCleaner);

  const averageCleaningTimePerCleaner =
    totalCleaningTime / numberOfCleaners + minCleaningTime;
  const hours = Math.floor(averageCleaningTimePerCleaner / 60);
  const minutes = Math.floor(averageCleaningTimePerCleaner % 60);

  // console.log(minutes);
  return { hours, minutes, numberOfCleaners };
};
