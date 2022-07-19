// -*- js -*-
// Copyright © 2018 by Ezer IT Consulting. All rights reserved. E-mail: claus@ezer.dk

// Code to handle feature selection for sentence units when creating an exercise.
// Note: The terms "sentence unit", "question object", and "quiz object" are used more or less
// synonymously.


//****************************************************************************************************
// PanelTemplQuizObjectSelector class
//
// Handles the sentence unit selection tab. It contains code for generating feature selectors for
// sentence unit selection.
//
// This class is a subclass of PanelTemplMql which handles much of the HTML generation.
//
class PanelTemplQuizObjectSelector extends PanelTemplMql {
    private featSelLab : JQuery = $(`<span>${localize('feature_prompt')}</span>`); // 'Feature:' label
    private featureTab : PanelTemplQuizFeatures;                                   // The tab for feature selection

    //------------------------------------------------------------------------------------------
    // Constructor method
    //
    // Creates the panel for sentence selection.
    //
    // Parameters:
    //     md: Selection information from exercise file.
    //     where: The <div> where this class should store the generated HTML.
    //     featureTab: The tab for feature selection
    //
    constructor(md : MqlData, where : JQuery, featureTab : PanelTemplQuizFeatures) {
        super(md,'qosel');
        this.featureTab = featureTab;

        // Set localized text for MQL/friendly selector buttons
        this.rbMqlLabel = $(`<span>${localize('mql_featsel_prompt')}</span>`);
        this.rbFriendlyLabel = $(`<span>${localize('friendly_featsel_prompt')}</span>`);

        this.doLayout(where); // Do the actual layout of the panel

        this.finish_construct();
    }

    //------------------------------------------------------------------------------------------
    // switchToMql method
    //
    // Switches between the friendly feature selector and MQL input.
    //
    // Parameter:
    //     useMql: True to switch to MQL, false to switch to friendly feature selector.
    //
    protected switchToMql(useMql : boolean) : void {
        // Enable/disable various HTML elements in the panel
        this.mqlText.prop('disabled', !useMql);
	this.featureCombo.prop('disabled', useMql);

        // Show that certain HTML elements are enabled or disabled
        if (useMql)
	    this.featSelLab.addClass('disabled');
        else
	    this.featSelLab.removeClass('disabled');

        // Hide or show the current feature selector
	if (this.currentBox) {
            if (useMql)
		this.currentBox.hide();
            else
		this.currentBox.show();
        }
    }

    //------------------------------------------------------------------------------------------
    // doLayout method
    //
    // Performs the actual layout of the HTML code generated by this class and its superclass.
    //
    // Parameter:
    //     where: The <div> where this class should store the generated HTML.
    //
    private doLayout(where : JQuery) : void {
        // The layout is a table containing a number of rows
        let table : JQuery = $('<table></table>');
        let row   : JQuery;
        let cell  : JQuery;

        // 1st row: Contains the question object type combobox
        row = $('<tr></tr>');
        cell = $(`<td>${localize('sentence_unit_type_prompt')}</td>`);
        row.append(cell);

        cell = $('<td></td>');
        cell.append(this.objectTypeCombo);
        row.append(cell);
        table.append(row);

        // 2nd row: Contains the MQL selector radio button and the MQL <textarea>
        row = $('<tr></tr>');
        cell = $('<td></td>');
        cell.append(this.rbMql, '&nbsp;', this.rbMqlLabel);
        row.append(cell);
        
        cell = $('<td></td>');
        cell.append(this.mqlText);
        row.append(cell);
        table.append(row);
        
        // 3rd row: Contains the friendly feature selector radio button
        row = $('<tr></tr>');
        cell = $('<td colspan="2"></td>');
        cell.append(this.rbFriendly, '&nbsp;', this.rbFriendlyLabel);
        row.append(cell);
        table.append(row);

        // 4th row: Contains the feature selector combobox
        row = $('<tr></tr>');
        cell = $('<td></td>');
       
        cell.append(this.featSelLab);
        row.append(cell);
        
        cell = $('<td></td>');
        cell.append(this.featureCombo);
        row.append(cell);
        table.append(row);
        
        // 5th row: Contains the 'Clear' button and the feature selector panels
        row = $('<tr></tr>');
        cell = $('<td id="clearbuttoncell"></td>');
       
        cell.append(this.clear);
        row.append(cell);
        
        cell = $('<td></td>');
        cell.append(this.fpan);
        row.append(cell);
        table.append(row);
        
        where.append(table);
    }

    //------------------------------------------------------------------------------------------
    // getUseForQo method
    //
    // Returns the value of the "Use for sentence unit selection" checkbox. The current class does
    // not have such a checkbox, so the function returns false.
    //
    // Returns.
    //     Always false.
    //
    protected getUseForQo() : boolean {
	return false;
    }

    //------------------------------------------------------------------------------------------
    // populateFeatureTab method
    //
    // Generate the content of the 'Features' tab based on the newly selected question object type.
    //
    // Parameter:
    //     otype: The question object to set.
    //
    public populateFeatureTab(otype : string) : void {
        if (otype === null)
            otype = this.getOtype();
        this.featureTab.populate(otype);
    }
}
