function sanitize( str ){
    // Replaces whitespace and tabs with one space
    return str.replace(/[\t+\s+]/g,' ').trim();
}

module.exports = {
    itemlessSenses: ( languageCode, languageQid ) => {
        const nounQid = 'Q1084';
        const itemForThisSensePid = 'P5137';
        const translationPid = 'P5972';
        const numberOfSensesPerRequest = 10;

        return sanitize(`
            SELECT DISTINCT ?lexemeId ?lemma ?senseId ?gloss
            WHERE {
            ?lexemeId dct:language wd:${languageQid};
                        wikibase:lexicalCategory wd:${nounQid};
                        wikibase:lemma ?lemma;
                        ontolex:sense ?senseId.
            ?senseId skos:definition ?gloss.
            FILTER(LANG(?gloss) = "${languageCode}")
            MINUS { ?senseId wdt:${itemForThisSensePid} [] }
            MINUS { ?senseId wdt:${translationPid} [] }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${languageCode}". }
            }
            LIMIT ${numberOfSensesPerRequest}
        `);
    },

    sandboxedItemlessSenses: () => {
        const catQid = 'Q3938';
        const itemForThisSensePid = 'P5137';
        const translationPid = 'P5972';
        const numberOfSensesPerRequest = 10;
        const languageCode = 'en';
        const languageQid = 'Q3938';

        return sanitize(`
            SELECT DISTINCT ?lexemeId ?lemma ?senseId ?gloss
            WHERE {
            ?lexemeId dct:language wd:${languageQid};
                        wikibase:lexicalCategory wd:${catQid};
                        wikibase:lemma ?lemma;
                        ontolex:sense ?senseId.
            ?senseId skos:definition ?gloss.
            FILTER(LANG(?gloss) = "${languageCode}")
            MINUS { ?senseId wdt:${itemForThisSensePid} [] }
            MINUS { ?senseId wdt:${translationPid} [] }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${languageCode}". }
            }
            LIMIT ${numberOfSensesPerRequest}
        `);
    }
}
