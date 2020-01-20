package com.eclinic.util.misc;

import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Missing doc
 */
public class Misc {

    /** Granulation of methods is small since javac will opt. */

    /** One of many ways to unregexify. Oneliner in a method for possible reimplementation. */
    static private String unregexify(String s) {
        return "\\Q" + s + "\\E";
    }

    /** Sad way to validate regex. Both throw and compile are slow but currently best time/return ratio */
    static private Boolean validRegex (String s) {
        try {
            Pattern.compile(s);
            return true;
        } catch (PatternSyntaxException exception) {
            return false;
        }
    }

    /** For uniformity of interface, wrapped the oneliner. (dis|en)abled pair.
     * Using these can (dis|en)able regex search in the app search bar.
     */
    static public String disabledRegexSearchText(String s) {
        return unregexify(s);
    }

    /** For uniformity reasons wrapped the oneliner. (dis|en)abled pair.
     * Using there can (dis|en)able regex search in app search bar.
     * Enable allows invalid expressions and those will be searched as regular strings
     */
    static public String enabledRegexSearchText(String s) {
        Boolean isValidRegex = Misc.validRegex(s);

        if (isValidRegex) {
            return s;
        } else {
            return unregexify(s);
        }
    }

    static public String enableAndSearchText(String s) {
        String[] words = s.split(" ");
        for(int i = 0; i < words.length; i++) {
            words[i] = "\""+ words[i] + "\"";
        }
        return String.join(" ", words);
        
    }
}