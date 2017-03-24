(function ($) {
    $.extend(true, window, {
        "Slick": {
            "Mapline": {
                "CustomSearch": CustomSearch
            }
        }
    });

    function CustomSearch(options) {
        var _grid;
        var _self = this;
        var _noMatchingSearchResultsContainer = null;
        var _gridAddNewRowOption = null;
        var _dataView;
        var _searchBox;
        var _clearSearchButton;
        var _filterFunction;
        var _defaults = {
            defaultSearch: false,
            searchBoxContainer: null,
            clearSearchButtonContainer: null,
            noMatchingSearchResultsContainer: null,
            filterFunction: null
        };
    

        function init(grid) {
            options = $.extend(true, {}, _defaults, options);
            _grid = grid;
            _dataView = _grid.getData();

            if (options.defaultSearch) {
                _searchBox = options.searchBoxContainer;
                _clearSearchButton = options.clearSearchButtonContainer;
                _noMatchingSearchResultsContainer = options.noMatchingSearchResultsContainer;
                _filterFunction = options.filterFunction;

                _dataView.onRowCountChanged.subscribe(handleRowCountChanged);
                registerClearSearchHandlers();
            }

            $(window).on('resize', resizeErrorMessage);

            $(_searchBox).keyup(setFilter);
        }

        function setFilter(e) {
            // clear on Esc
            if (e.which == 27) {
                this.value = "";
            }

            if (this.value.length > 0) {
                $(_clearSearchButton).show();
            } else {
                $(_clearSearchButton).hide();
            }

            var searchList = $.trim(this.value.toLowerCase()).split(/[\s\/]+/);
            _filterFunction(searchList);
            _grid.invalidate();

            this.focus();
        }

        function registerClearSearchHandlers() {
            $(".mpl-clear-search").click(function () {
                $(_searchBox).val('');
                $(_clearSearchButton).hide();
                _dataView.setFilter(function () {
                    return true;
                });
            });
        }

        function resizeErrorMessage() {
            if (_noMatchingSearchResultsContainer) {
                var gridLeftPosition = $(_grid.getContainerNode()).position().left;
                $(_noMatchingSearchResultsContainer).css("left", gridLeftPosition);
            }
        }

        function destroy() {
            if (options.showMessageOnNoMatchingSearchResults) {
                _dataView.onRowCountChanged.unsubscribe(handleRowCountChanged);
            }
        }

        function handleRowCountChanged(e, args) {
            var gridOptions = _grid.getOptions();

            if (args.current > 0) {
                $(_noMatchingSearchResultsContainer).hide();
                restoreEnableAddRowOptionValue(gridOptions);
            } else {
                if (_dataView.getItems().length === 0) {
                    $(_searchBox).val('');
                    $(_clearSearchButton).hide();
                    _dataView.setFilter(function () {
                        return true
                    });
                }
                else {
                    showNoMatchingResultsMessage();
                    $('.mpl-clear-search').click(function () {
                        _dataView.setFilter(function () {
                            return true
                        });
                    });

                    saveEnableAddRowOptionValue(gridOptions);
                    gridOptions.enableAddRow = false;
                }
                _grid.setOptions(gridOptions);
            }
        }

        function showNoMatchingResultsMessage() {
            var container = _grid.getContainerNode();
            var gridTopPosition = $(container).position().top;
            var gridLeftPosition = $(container).position().left;
            var headerHeight = $(".slick-header").height();
            $(_noMatchingSearchResultsContainer)
            .css("position", "absolute")
            .css("top", gridTopPosition + headerHeight)
            .css("left", gridLeftPosition);
            $(_noMatchingSearchResultsContainer).zIndex(1);
            $(_noMatchingSearchResultsContainer).show();
        }

        function saveEnableAddRowOptionValue(options) {
            _gridAddNewRowOption = options.enableAddRow;
        }

        function restoreEnableAddRowOptionValue(options) {
            if (_gridAddNewRowOption != null) {
                options.enableAddRow = _gridAddNewRowOption;
            }
        }

        // Public API
        $.extend(this, {
            "init": init,
            "destroy": destroy
        });
    }
})(jQuery);