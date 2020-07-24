// new
import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
// import el from 'i18next-icu/locale-data/el';

export const initi18n = () => {
    // the translations
    // (tip move them in a JSON file and import them)
    const resources = {
        en: {
            translation: {
                'Welcome to Venia':
                    'Welcome to Venia translated! Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.',
                'hello world': 'hello world translated!',
                icu:
                    '{numPersons, plural, =0 {no persons} =1 {one person} other {# persons}}',
                price: 'The sale price is ${amount}',
                'Trainers: {trainersCount, number}':
                    'Trainers: {trainersCount, number}',
                testKey:
                    'You have {numPhotos, plural, ' +
                    '=0 {no photos.}' +
                    '=1 {one photo.}' +
                    'other {# photos.}}'
            }
        },
        el: {
            translation: {
                'Welcome to Venia':
                    'Καλώς ήρθατε στο Venia που μεταφράστηκε! Πολύ μακριά, πίσω από τη λέξη βουνά, μακριά από τις χώρες Βοκαλία και Κονσόντια, ζουν τα τυφλά κείμενα. Χωρισμένοι ζουν στο Bookmarksgrove ακριβώς στην ακτή του Σημασιολογικού, ενός μεγάλου γλωσσικού ωκεανού. Ένα μικρό ποτάμι με το όνομα Ντάντεν ρέει από τον τόπο τους και το προμηθεύει με τα απαραίτητα regelialia. Είναι μια παραδειγματική χώρα, στην οποία ψημένα μέρη των προτάσεων πετούν στο στόμα σας. Ακόμα και το πανίσχυρο Pointing δεν έχει κανέναν έλεγχο για τα τυφλά κείμενα είναι μια σχεδόν ανόρθωτη ζωή. Μια μέρα όμως μια μικρή σειρά τυφλού κειμένου με το όνομα Lorem Ipsum αποφάσισε να φύγει για τον μακρινό κόσμο της γραμματικής. Το Big Oxmox την συμβούλεψε να μην το κάνει, επειδή υπήρχαν χιλιάδες κακά κόμματα, άγρια ​​ερωτηματικά και ολίθιος Semikoli, αλλά το Little Blind Text δεν άκουσε. Της έβαλε τα επτά versalia, την έβαλε αρχικά στη ζώνη και έφτασε στο δρόμο. Όταν έφτασε στους πρώτους λόφους των Ιταλικών Ορέων, είχε μια τελευταία θέα πίσω στον ορίζοντα της πατρίδας της Bookmarksgrove, τον τίτλο του Αλφαβήτου και τη γραμμή του δικού της δρόμου, το Line Lane.',
                'hello world': 'γεια σου κόσμο μεταφραστεί!',
                icu:
                    '{numPersons, plural, =0 {κανένα άτομο} =1 {ένα άτομο} other {# άτομα}}',
                price: 'Η τιμή πώλησης είναι {amount} €',
                'Trainers: {trainersCount, number}':
                    'Εκπαιδευτές: {trainersCount, number}',
                testKey:
                    'Εχεις {numPhotos, plural, ' +
                    '=0 {όχι φωτογραφίες.}' +
                    '=1 {μία φωτογραφία.}' +
                    'άλλα {# φωτογραφίες.}}'
            }
        }
    };

    // Configure i18next
    i18n.use(ICU)
        .use(initReactI18next) // passes i18n down to react-i18next

        .init({
            debug: true,
            fallbackLng: 'en',
            resources,
            lng: 'el',

            keySeparator: false, // we do not use keys in form messages.welcome

            interpolation: {
                escapeValue: false // react already safes from xss
            }
        });
};
