;(function( $ )
{
    var pluginName  = 'ggergoMillerColumns',
        defaults    =
        {
            root            :   1,
            column          :   'ul',
            option          :   'li',
            children        :   function (id) {},
            optionContent   :   function (id) {},
            optionAttr      :   function (id) { return { 'tabindex': '1' }; },
            columnAttr      :   function (id) { return {}; },
            selectCallback  :   function (option)
            {
                if (0 < option.length) { option.focus(); }
                var last = $('#'+this.attr('id') + ' *[data-parentId]').last();
                $('#'+this.attr('id')).scrollLeft(this.scrollLeft() + last.position().left + last.outerWidth() - this.width());
            },
            onClick         :   function(event)
            {
                // do stuff
                var option =    typeof $(event.target).closest('*[data-id]').attr('data-id') !== 'undefined'    ? $(event.target).closest('*[data-id]'):
                                typeof $(event.target).attr('data-parentId') !== 'undefined'
                                    &&
                                0 < $(event.target).prev('*[data-parentId]').children('*[data-id]').length      ? $(event.target).prev('*[data-parentId]').children('*[class~="selected"]') :
                                0 < $('#'+this.attr('id')+' *[class~="selected"]').length                       ? $('#'+this.attr('id')+' *[class~="selected"]').last() :
                                $('#'+this.attr('id')+' *[data-id]:first-child');

                if (this.data('ggergo-mc').children.call(this, option.attr('data-id')).length > 0)
                {
                    event.preventDefault();
                }

                // return option for selecting node
                return option;
            }
        };

    var showChildren = function (id, children)
    {
        if (children.length > 0)
        {
            var $this = this;
            var column = $('<'+this.data('ggergo-mc').column+'/>', this.data('ggergo-mc').columnAttr.call(this,id))
                                .attr('data-parentId', id)

            for(var i = 0; i < children.length; i++)
            {
                var option = $('<'+$this.data('ggergo-mc').option+'/>', $this.data('ggergo-mc').optionAttr.call(this,children[i]))
                                .attr('data-id', children[i])
                                .html($this.data('ggergo-mc').optionContent.call($this,children[i]));
                column.append(option);
            }

            this.append(column);
        }
    }

    var methods =
    {
        init : function( parameters )
        {
            if (typeof this.attr('id') === 'undefined' || this.attr('id') === '') { $.error('Selected element must have id attribute!') }

            var $this = this;
            if ( typeof(this.data('ggergo-mc')) === 'undefined' )
            {
                // merge settings
                this.data('ggergo-mc', $.extend({}, defaults, parameters));

                // attach click event listener
                $(document).on('click', '#'+this.attr('id'), function (event)
                {
                    var option = $this.data('ggergo-mc').onClick.call($(this), event);

                    if (typeof option !== 'undefined' && option !== null)
                    {
                        methods.selectNode.call($this, option);
                    }
                });
            }
            else
            {
                // merge settings
                this.data('ggergo-mc', $.extend({}, this.data('ggergo-mc'), parameters));
            }

            // select root node
            this.html('');
            methods.selectNode.call(this, this.data('ggergo-mc').root);
        },

        selectNode : function (option)
        {
            var id;

            // existing
            if (typeof option === 'object')
            {
                while (option.parent().get(0) !== $('#'+this.attr('id')+' *[data-parentId]:last').get(0))
                {
                    $('#'+this.attr('id')+' *[data-parentId]:last').remove();
                }

                option.parent().children('*[data-id]').removeClass('selected');
                option.addClass('selected');

                id = option.attr('data-id');
            }
            // non existent
            else
            {
                id = option;
                option = $('#'+this.attr('id')+' *[data-id="'+id+'"]').last();
            }

            showChildren.call(this, id, this.data('ggergo-mc').children.call(this, id));

            this.data('ggergo-mc').selectCallback.call(this,option);
        }
    };

    $.fn[pluginName] = function(method)
    {
        return  methods[method]                         ? methods[method].apply( this, Array.prototype.slice.call( arguments, 1 )) :
                typeof method === 'object' || ! method  ? methods.init.apply( this, arguments ) :
                $.error( 'Method ' +  method + ' does not exist on jQuery.' + pluginName );
    };

})( jQuery );