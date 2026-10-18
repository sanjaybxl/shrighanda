export interface EventPosterImage {
  src: string;
  alt: string;
}

export interface EventDetails {
  eventHeading: string;
  celebrationMonth: string;
  celebrationDay: number;
  year: number;
  posterImages: EventPosterImage[];
  posterMessage: string;
  venueAddress: string;
  venueMapUrl: string;
}

const events = {
  kannadaRajyotsava: {
    eventHeading: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ',
    celebrationMonth: 'November',
    celebrationDay: 14,
    posterImages: [
      {
        src: 'https://usercontent.one/wp/shrigandha.nl/wp-content/themes/shrighanda_new/angular-app/assets/events/2026/rajyotsava/poster.jpeg',
        alt: 'Kannada Rajyotsava 2026 celebration poster with the event date and venue'
      }
    ],
    posterMessage: 'The Kannada Rajyotsava 2026 poster will be announced soon.'
  },
  shrigandhaUgadi: {
    eventHeading: 'ಶ್ರೀಗಂಧ ಯುಗಾದಿ',
    celebrationMonth: 'March',
    celebrationDay: 21,
    posterImages: [
      {
        src: 'https://usercontent.one/wp/shrigandha.nl/wp-content/themes/shrighanda_new/angular-app/assets/events/2026/ugadi/poster.png',
        alt: 'Shrigandha Ugadi 2026 event poster'
      },
      {
        src: 'https://usercontent.one/wp/shrigandha.nl/wp-content/themes/shrighanda_new/angular-app/assets/events/2026/ugadi/cultural.png',
        alt: 'Shrigandha Ugadi 2026 cultural program'
      },
      {
        src: 'https://usercontent.one/wp/shrigandha.nl/wp-content/themes/shrighanda_new/angular-app/assets/events/2026/ugadi/cultural1.png',
        alt: 'Shrigandha Ugadi 2026 cultural program'
      }
    ],
    posterMessage: 'The Shrigandha Ugadi 2026 poster will be announced soon.'
  }
};

const activeEvent: keyof typeof events = 'kannadaRajyotsava';
const selectedEvent = events[activeEvent];

export const eventDetails: EventDetails = {
  ...selectedEvent,
  year: 2026,
  venueAddress: 'Ouverture 214, 5629 PX Eindhoven',
  venueMapUrl:
    'https://www.google.com/maps/place//data=!4m2!3m1!1s0x47c6dec163d032fb:0x9b023f7eecfa10e3?sa=X&ved=1t:8290&ictx=111'
};
