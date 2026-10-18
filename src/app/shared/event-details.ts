const events = {
  kannadaRajyotsava: {
    title: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ',
    celebrationMonth: 'November',
    celebrationDay: 14
  },
  shrigandhaUgadi: {
    title: 'ಶ್ರೀಗಂಧ ಯುಗಾದಿ',
    celebrationMonth: 'March',
    celebrationDay: 21
  }
};

const activeEvent: keyof typeof events = 'kannadaRajyotsava';

export const eventDetails = {
  eventHeading: events[activeEvent].title,
  celebrationMonth: events[activeEvent].celebrationMonth,
  celebrationDay: events[activeEvent].celebrationDay,
  year: 2026,
  venueAddress: 'Ouverture 214, 5629 PX Eindhoven',
  venueMapUrl:
    'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47c6dec163d032fb:0x9b023f7eecfa10e3?sa=X&ved=1t:8290&ictx=111'
};
