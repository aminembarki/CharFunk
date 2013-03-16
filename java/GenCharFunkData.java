//The purpose of this class is to generate the constants needed in CharFunk.
//It is not in a package because that would be overkill.

public class GenCharFunkData {
   
static int GTYPE_LETTER=1;
static int GTYPE_DIGIT=2;
static int GTYPE_OTHER=3;

public static void main(String[] args) {
    StringBuffer gtype_table=new StringBuffer();
    StringBuffer wspace_table=new StringBuffer();

    //first deal with type
    int prvtyp=-1;//type before current
    int prvstr=-1;//location that type started
    //now loop through all chars through FFFF
    for(int ci=0; ci<65535; ci++) {
        char cha=(char)ci;
        int typ=GTYPE_OTHER;

        if(Character.isLetter(cha)) typ=GTYPE_LETTER;
        if(Character.isDigit(cha))  typ=GTYPE_DIGIT;

        if(typ!=prvtyp) {
            if(prvtyp>-1) {
                if(gtype_table.length()>0) gtype_table.append(",");
                gtype_table.append(prvstr+":"+prvtyp);
                }
            prvtyp=typ;
            prvstr=ci;
            }
        }
    gtype_table.append(","+prvstr+":"+prvtyp);
    System.out.println("_GTYPE_TABLE={"+gtype_table+"},");

    //second deal with space

    //now loop through all chars through FFFF
    for(int ci=0; ci<65535; ci++) {
        char cha=(char)ci;

        if(Character.isWhitespace(cha)) {
            if(wspace_table.length()>0) wspace_table.append(",");
            wspace_table.append(ci+":1");
            }
        }
    System.out.println("_WSPACE_TABLE={"+wspace_table+"},");
    
    }


}