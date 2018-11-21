/*
Project Name: Coty
Data: 20/09/2018
*/

var wdw = $(window);
var body = $('body');
const spdSlider = 300;
var vSpdSlider = spdSlider;

//console.log('Loja Coty');

function omission () {
  (function($) {
    'use strict';

    $.fn.succinct = function(options) {

      var settings = $.extend({
          size: 240,
          omission: '...',
          ignore: true
        }, options);

      return this.each(function() {

        var textDefault,
          textTruncated,
          elements = $(this),
          regex    = /[!-\/:-@\[-`{-~]$/,
          init     = function() {
            elements.each(function() {
              textDefault = $(this).html();

              if (textDefault.length > settings.size) {
                textTruncated = $.trim(textDefault)
                        .substring(0, settings.size)
                        .split(' ')
                        .slice(0, -1)
                        .join(' ');

                if (settings.ignore) {
                  textTruncated = textTruncated.replace(regex, '');
                }

                $(this).html(textTruncated + settings.omission);
              }
            });
          };
        init();
      });
    };
  })(jQuery);
} omission();

var cotyCall = {

  //function criaCookie(a, b, d) {
  criaCookie: function(a, b, d) {
      var c = new Date;
      //c.setTime(c.getTime() + 3285e6), document.cookie = a + "=" + b + ";expires=" + c.toUTCString()
      c.setTime(c.getTime() + 3285e6), document.cookie = a + "=" + b;
  },

  //function lerCookie(a) {
  lerCookie: function(a) {
      var b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)");
      return b ? b[2] : null
  },

  //function checkCokie() {
  checkCokie: function() {
      var numLoads = parseInt(cotyCall.lerCookie('pageLoads'), 10);
      if (isNaN(numLoads) || numLoads <= 0) { 
         cotyCall.criaCookie('pageLoads', 1);
      } else { 
         cotyCall.criaCookie('pageLoads', numLoads + 1); 
      }
      if(cotyCall.lerCookie('pageLoads') > 2) {
           $(".popUpNews").addClass("hide");
      } else {
           $(".popUpNews").addClass("show");
      }
  },

  miniCart: function() {

    // atualiza sacola do topo
    $(document).one("ajaxStop", function() {
      vtexjs.checkout.getOrderForm().done(function(orderForm) {
         var qtdCart = orderForm.items.length;
         //qtdCart = "("+qtdCart+")";
         $(".cart-link > span").html(qtdCart);
         if(qtdCart > 1 ){
          $(".cart-panel").addClass("active");
         } else {
          $(".cart-panel").removeClass("active");
         }
         $(".linkModalMiniCart").html(qtdCart);  
      });
    });

    // atualiza minicart
    vtexjs.checkout.getOrderForm().done(function(orderForm) {
      $(".card-products-wrapper").html("");
      var qtd = orderForm.items.length;
      if(qtd > 0) {
        var i;
        for (i = 0; i < qtd; i++) { 
          var foto = orderForm.items[i].imageUrl;
          var marca = orderForm.items[i].additionalInfo.brandName;
          var nome = orderForm.items[i].name;
          var dimension = orderForm.items[i].refId;
          dimension = dimension.substr(dimension.length - 3).split('_').pop().trim();
          var precoDe = parseFloat(Math.round(orderForm.items[i].listPrice) / 100).toFixed(2);
          var precoPor = parseFloat(Math.round(orderForm.items[i].price) / 100).toFixed(2);
          //console.log(i+" "+marca+" "+nome+" "+precoDe+" "+precoPor);
          //if(precoDe == precoPor) {
            $(".card-products-wrapper").append('<productcart><div class="media"><div class="media-left"><img alt="'+nome+'" src="'+foto+'" /></div><div class="media-body text-left"><h3>'+marca+'</h3><p class="name">'+nome+'<span>'+dimension+'</span></p><p class="price red"><span class="price02">'+precoPor+'</span></p></div></div></productcart>');
          //} else {
            //$(".card-products-wrapper").append('<productcart><div class="media"><div class="media-left"><img alt="'+nome+'" src="'+foto+'" /></div><div class="media-body text-left"><h3>'+marca+'</h3><p class="name">'+nome+'<span>'+dimension+'</span></p><p class="price red"><span class="price01">'+precoDe+'</span><span class="price02">'+precoPor+'</span></p></div></div></productcart>');
          //}
        }
        subtotal = parseFloat(Math.round(orderForm.totalizers[0].value) / 100).toFixed(2);
        subtotal = subtotal.replace(",", "-").replace(".", ",").replace("-", ".");
        $(".card-default .subtotal").html(subtotal);
      } else {
        $(".cart-panel").addClass("empty");
        $(".card.card-default").html("<p id='sacolaVazia'>Sua sacola está vazia!</p>");
      }      

    });

  },

  reconheceMobile: function() {
    if (wdw.width() > 767) {
      body.addClass('deskPage');
    } else {
      body.addClass('mobPage');
    }
  },

  backToTop: function() {
    $("body").append('<div id="go-top"></div>');
    $(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $("#go-top").addClass('sr-only');
      } else {
        $("#go-top").removeClass("sr-only");
      }
    });
    $("#go-top").click(function(){
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {           
        window.scrollTo(0,0) // first value for left offset, second value for top offset
        //$('body').scrollTop();
      } else {
        $('html, body').animate({scrollTop : 0},300);
        return false;
      }
    });
  },

  fixedPrices: function() {

    if($("body").hasClass("mobPage")){
      $("#fixedPricesProd").addClass('ok');
      $(window).scroll(function(){
        if ($(this).scrollTop() > 100 && $(this).scrollTop() < 800) {
          $("#fixedPricesProd").removeClass('ok');
        } else {
          $("#fixedPricesProd").addClass("ok");
        }
      });
    }
  },

  removeComplement: function() {
    $(".helperComplement").remove();
  },

  sliderProducts: function(a) {
    setTimeout(function() {
      $(a).slick({
          dots: !1,
          infinite: !0,
          speed: 800,
          arrows: !0,
          slidesToShow: 5,
          slidesToScroll: 5,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            }
          ]
      });
    }, 500);
  },

  sliderProductsSpecial: function(a) {
    setTimeout(function() {
      $(a).slick({
          dots: !1,
          infinite: !0,
          speed: 800,
          arrows: !0,
          slidesToShow: 2,
          slidesToScroll: 2,
          responsive: [
            {
              breakpoint: 1081,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },

            {
              breakpoint: 901,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            }, 
            {
              breakpoint: 678,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            }
          ]
      });
    }, 500);
  },

  sliderProductsLarge: function(a) {
    setTimeout(function() {
      $(".shelf-large  > div > ul").slick({
          dots: !1,
          infinite: !0,
          speed: 800,
          arrows: !0,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            }
          ]
      });
    }, 500);
  },

  sliderBrands: function(a) {
    $(a).slick({
      dots: !1,
        //autoplay: !0,
        //  autoplaySpeed: 3e3,
        pauseOnHover: !0,
        infinite: !0,
        speed: vSpdSlider,
        arrows: !0,
        slidesToShow: 7,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        draggable: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
            }
          }
        ]
    });

    //FAzendo com que o click mostre o slide atual
    
  },

  sliderBanners: function(a) {
    $(a).slick({
        dots: !0,
        autoplay: !0,
        autoplaySpeed: 5e3,
        pauseOnHover: !0,
        infinite: !0,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
    });
  },

  tamanhoVitrine: function(a) {
    $(a).each(function(index) {
    //$(".product-list > .main .shelf li").each(function(index) {
      var idProd = $(".data", this).attr("data-id");
      if (idProd != undefined) {
        var base = "/api/catalog_system/pub/products/variations/";
        var url = base + idProd;
        //console.log(url);
        var $that = $(this);
        $.getJSON(url, function(data) {
          //console.log(data);
          var dimensao = data.dimensions[0];
          //console.log(dimensao);
          if(dimensao){
            //$(".productinstallment", $that).after("<p class='product-size'></p>");
            tam = data.dimensionsMap[dimensao];
            $.each(tam,function(key,val){
              var tamanho = data.skus[key].dimensions[dimensao];
              var disp = data.skus[key].available;
              if(disp == true && tamanho != "NULO"){
                //console.log(tamanho);
                $(".product-size", $that).append("<span>"+tamanho+"</span>");
              }
            });
          }
        });
      }
    });
  },

  chamadaQuickView: function(){

    // correção do quick view em HTTPS
    $(".prateleira .compra-rapida").each(function(){
      var url = $(".thickbox", this).attr("href");
      url = url.replace(/^http:\/\//i, 'https://');
      //console.log(url);
      $(".thickbox", this).attr("href", url);
    });
    
    $(".buy-in-page-button").click(function() {
      //console.log("clicou no quick");
      $(".alertProd").remove();
      $(this).before("<p class='alertProd'></p>");
      var hrefCart = $(this).attr("href");
      var message = "javascript:alert('Por favor, selecione o modelo desejado.');";
      if(hrefCart == message){
        alert = function() {};
        //$(".buy-in-page-button").attr("href","javascript:void(0);");
        $(".alertProd").html("<span>Selecione uma opção</span>");
      } else {
        alert = function() {};
        $(".alertProd").remove();
        var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
        //var qtd = $(".showValue").val();
        var qtd = 1;
        console.log("resUTL: "+resUTL+" Qtd: "+qtd);
        setTimeout(function(){ 
          vtexjs.checkout.getOrderForm().then(function(){
            var item = {
                id: resUTL,
                quantity: qtd,
                seller: 1
            };
            vtexjs.checkout.addToCart([item]).done(function(orderForm){
              console.log(item.quantity);
              var qtdCart = item.quantity;

              setTimeout(function(){
                  //parent.$("#TB_overlay").trigger("click");
                  //parent.$("#customAlert #msg").html("Item adicionado com sucesso!");
                  //parent.$("#customAlert").toggleClass("sucess").css("display","inline-block");
              }, 2000);
            
            });
          });
        }, 1000);
      }
    });

  },

  filters: function() {
    var count = $(".filtro-ativo").length;
    if(count >= 1) {
      //mostra campo de filtros ativos
      var url = $(".ver-filtros").attr("href");
      $("#tagFiltros").before('<div class="applyed-filters"><ul class="list-unstyled"></ul></div>')
      $(".filtro-ativo").each(function(){
        var name = $(this).html();
        console.log(name);
        $(".applyed-filters ul").append('<li><a href="'+url+'"><span>'+name+'</span></a></li>');
        /*$(this).next().html(name);
        $(this).addClass("hideFilter");*/
      });
      $(".search-multiple-navigator").prepend("<a href='"+url+"' id='cleanFilters'>Limpar Filtro  x</a>");
    }
    $(".menu-departamento h3.categoria-padrao, .menu-departamento ul.categoria-padrao").remove();
  },

  showLogin: function() {
    $(document).one("ajaxStop", function() {
      $("header .ajax-content-loader").each(function(){
        if($("#login", this).length) {
          //console.log("não logado");
          $(this).parent().addClass("loginOff");
          $("body").addClass("loginOff");
        } else {
          //console.log("logado");
          $(this).parent().addClass("loginOn");
          $("body").addClass("loginOn");
        }
      });
    });
  },

  imagensDoProduto: function() {
    
    //busca imagens do produto
    var allProdSkus = [];
    var allObjImg = [];
    var imgSizes = [];
    var imgName, imgPath, theModel;
    var lclSldrPrd = $('.lin01Col01 .imagePlace');
    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
      allProdSkus = product.skus;
      allObjImg = getSkuData(allProdSkus[0].sku).images;
      $(allObjImg).each(function(ii) {
        imgName = allObjImg[ii][3].Name;
        imgPath = allObjImg[ii][3].Path;
        lclSldrPrd.append(
          '<div><img src="'+imgPath+'" alt="'+imgName+'" class="liImage imgProd imgProd'+ii+'" data-zoom-image="'+imgPath+'" /></div>'
        );
      });
    });

    // verifica se tem video
    if($(".value-field").hasClass("Video")) {
      var videoLink = $(".value-field.Video").html();
      $(".thumbnail .lastThumb").css("display", "block").addClass("thumbVideo");
      //console.log("link do video"+videoLink);
      $('.lin01Col01 .imagePlace').append('<div>'+videoLink+'</div>');
    }

    // slider nas fotos grandes
    setTimeout(function(){
      $(".imagePlace").slick({
          dots: true,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1440,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      });
    }, 200);

    // criando area do super zoom
    //$("#product-details-wrapper").prepend("<div id='superZoomBox'></div>");

    // troca dots por imagens
    setTimeout(function(){
      $(".imagePlace .slick-track img").each(function(i){
        var img = $(this).attr("src");
        $(".imagePlace .slick-dots li:eq("+i+") button").html("<img src='"+img+"' />");
      });
      $(".lin01Col01").animate({opacity:1});

      if (wdw.width() > 1439) {
        // ultimo thumb
        //var last = $(".imagePlace .slick-track img").last().attr("src");
        //$(".slick-dots").append("<li role='presentation' class='lastThumb'><button><img src='"+last+"' /></button></li>");
      }

    }, 1000);

    // simula click no ultimo thumb
    //jQuery(document).on("click", ".lastThumb", function (event) {
      //$(this).prev().trigger("click");
    //});

    // super zoom para desktop
    // if (wdw.width() > 800) {
    if (wdw.width() >= 901) {
      setTimeout(function() {
          $(".imagePlace div.slick-active img").elevateZoom({
            lensSize: 100
          });
      },300);

      // adiciona zoom em outro local
      setTimeout(function(){
        var zW, zH;
        $(".zoomContainer").each(function(){
          zW = $(this).width();
          zH = $(this).height();
          //console.log(zW+','+zH);
          $("#superZoomBox").append($(".zoomWindowContainer", this));
        });
        $('.zoomWindowContainer, .zoomWindowContainer > div').css('width',zW+'px').css('height',zH+'px');
      }, 1500);
    } 

    // chamando novamente super zoom depois de mudar slick
    $(".imagePlace").on('afterChange', function(){
        if (wdw.width() > 800) {

          $("body").addClass("hideZoom");

          // remove atual
          $.removeData($('img'), 'elevateZoom');
          $('.zoomContainer, .zoomWindowContainer').remove();

          // adiciona zoom nas imagens atuais
          $(".imagePlace div.slick-active img").elevateZoom({
            lensSize: 100
          });

          /*setTimeout(function(){
            $(".zoomContainer").each(function(){
                $("#superZoomBox").append($(".zoomWindowContainer", this));
            });
          }, 200);*/

          setTimeout(function(){$("body").removeClass("hideZoom");}, 1000);

        } 

    });

    // slider nas thumbs (mobile)
    //if ( body.hasClass('mobilePage')) {
      $(document).one("ajaxStop", function() {
        setTimeout(function(){
          $(".imagePlace > .slick-dots").slick({
              dots: false,
              infinite: false,
              slidesToShow: 5,
              slidesToScroll: 5,
              vertical: true,
              verticalSwiping: true,
              responsive: [
                {
                  breakpoint: 1199,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                  }
                },
                {
                  breakpoint: 1099,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  // breakpoint: 768,
                  breakpoint: 901,
                  settings: "unslick"
                }
              ]
          });
        }, 400);
        setTimeout(function(){
          //$(".imagePlace .slick-dots > .slick-arrow.slick-prev").trigger("click");
          $(".imagePlace .slick-dots .slick-track li").removeClass("slick-active");
          //$(".imagePlace .slick-dots .slick-track li").first().addClass("slick-active");
          //console.log("ajustes");

          // thumb de video
          if($(".value-field").hasClass("Video")) {
            $(".imagePlace .slick-track li").last().addClass("thumbVideo");
          }

          // primeiro selecao
          $(".coty-product .slick-dots li").first().addClass("slick-active");

        }, 1200);
        $(".imagePlace > .slick-dots").on('afterChange', function(){
          $(".imagePlace .slick-dots .slick-track li").removeClass("slick-active");
          console.log("afterchange");
        });
      });

    //}
    
  },

  updateCart: function() {
    var hrefCart = $(".buy-button").attr("href");
    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
    //console.log(resUTL);
    setTimeout(function(){ 
      vtexjs.checkout.getOrderForm().then(function(){
        var item = {
            id: resUTL,
            quantity: 1,
            seller: 1
        };
        vtexjs.checkout.addToCart([item]).done(function(orderForm){
          /*var qtdCart = item.quantity;
          cotyCall.miniCart();
          $('html, body').animate({scrollTop : 0},300);
          $(".cart-panel").removeClass("empty");
          $(".cart-panel").addClass("active activeTemp");
          setTimeout(function(){
            $(".cart-panel").removeClass("activeTemp");
          }, 5000);*/
          cotyCall.tempMiniCart();
          //console.log("adicionou.");
        });
      });
    }, 1000);
  },

  guiaMedidas: function() {
    $(".panel.guia .panel-heading").click(function(){
      $(".medidasBt").trigger("click");
    });
  },

  fixModal: function() {
    jQuery(document).on("click", ".modal.fade.in", function (event) {
      //$("modal-dialog", this).preventDefault();
      $(this).find(".close").trigger("click");
    });
    jQuery(document).on("click", ".modal-body", function (event) {
       event.stopPropagation();
    });  
  },

  sendNews: function() {

    $(".enviarNewsLateral").click(function(){

        //var varN = $(this).prev(".form-group").prev(".form-group").children("#push-name").val();
        var varE = $(this).prev(".formsArea").children(".boxCampoPu").children(".puEmail").val();
        
        function validate(){

          if (validateEmail(varE)) {
            getFromMasterData('NL', 'email='+varE, 'email');
          } else {
            // preencha um e-mail válido
            $(".newsError").remove();
            $(".formsArea").prepend("<label class='error newsError'>Preencha um e-mail válido</label>");
          }
          return false;
        }

        if(varE == ''){
          // erro no campo e-mail
          $(".newsError").remove();
          $(".formsArea").prepend("<label class='error newsError'>Preencha o campo e-mail</label>");
        } else if(varE != ''){
          // tudo certo
          validate();
      }

      // verifica se já existe e-mail cadastrado
      function getFromMasterData(name, where, fields) {  
          var store = 'lojacoty';
          var urlProtocol = window.location.protocol;
          //var apiUrl = urlProtocol + '//api.vtex.com/' + store + '/dataentities/' + name + '/search?_where=' + where + '&_fields='+ fields;
          var apiUrl =  'https://lojacoty.vtexcommercestable.com.br/api/dataentities/' + name + '/search?_where=' + where + '&_fields='+ fields;
          // https://lojacoty.vtexcommercestable.com.br/api/lojacoty/dataentities/NL/search?_where=email=nadia@agenciaeplus.com.br&_fields=email
          var response;

         $.ajax({
              "headers": {
                  "Accept": "application/vnd.vtex.masterdata.v10.profileSchema+json"
              },
              "url": apiUrl,
              "async" : false,
              "crossDomain": true,
              "type": "GET"
          }).success(function(data) {
              //response = data;
              response = data[0];
              if(response == undefined){
                // não existe e-mail
                enviaDados();
              } else {
                // existe e-mail
                //console.log("e-mail já cadastrado");
                $(".newsError").remove();
                $(".formsArea").prepend("<label class='error newsError'>E-mail já cadastrado</label>");
              }
          }).fail(function(data) {
              response = data;
          });

         return response;
      }

      function enviaDados(){
        var datos = {};
        datos.email = varE;
        //datos.name = varN;
        ////("Nome: "+datos.name+"  E-mail: "+datos.email+"  Mensagem: "+datos.mensagem);
        $.ajax({
          accept: 'application/vnd.vtex.ds.v10+json',
          contentType: 'application/json; charset=utf-8',
          crossDomain: true,
          data: JSON.stringify(datos),
          type: 'POST',
          //url: '//api.vtexcrm.com.br/lojacoty/dataentities/NL/documents',
          url: 'https://lojacoty.vtexcommercestable.com.br/api/dataentities/NL/documents',
          success: function(data) {
            $(".newsError").remove();
            $(".formPU").css("display", "none");
            $(".newsCapBox > div > h3").html("Cadastro realizado <br />com sucesso!");
            //console.log("Sucesso!");
          },
            error: function(error){
            console.log(error);
          }
        });
      }

    });
  },

  searchTerm: function() {
    var termo = $("head meta[name='Abstract']").attr("content");
    console.log(termo);
    $(".bread-crumb ul").append("<li class='bold lastSearch'><a class='bold'>Resultados para: "+termo+"</a></li>");
  },

  searchTerm2: function() {
    //var termo = $("head meta[name='Abstract']").attr("content");
    var termo = dataLayer["0"].pageTitle
    //console.log(termo);
    termo = termo.replace(" – lojacoty", "");
    //termo = termo.replace(/ em .*$/i, "");
    //termo = termo.replace(" em ", "");
    $(".bread-crumb ul").append("<li class='bold lastSearch'><a class='bold'>Busca: "+termo+"</a></li>");
    $(".bread-crumb .last").addClass("hide");
    var tam = $(".search-single-navigator h4").length;
    //console.log("tam: "+tam);
    if(tam >= 1) {
      $(".coty-busca .search-single-navigator > h3").addClass("hide");
    }
  },

  fixTerms: function() {
    setTimeout(function(){
      $("#giftlistname, #giftlisturl").val("Wishlist");
      $("#giftlistaccept").trigger("click");
      setTimeout(function(){
        $("#giftlistv2save").trigger("click");
      }, 100);
    }, 500);
  },

  fixQuickView: function() {
    //$('.vitrine.resultItemsWrapper').bind("DOMSubtreeModified",function(){
      // correção do quick view em HTTPS
      $(".shelf .compra-rapida").each(function(){
        var url = $(".thickbox", this).attr("href");
        url = url.replace(/^http:\/\//i, 'https://');
        //console.log(url);
        $(".thickbox", this).attr("href", url);
      });
    //});
    $(window).on( "load", function() {
      $(".thickbox").addClass("active");
    });
  },

  fixQuickViewPage: function() {
    $(".product-list > .main .shelf .compra-rapida").each(function(){
      var url = $(".thickbox", this).attr("href");
      url = url.replace(/^http:\/\//i, 'https://');
      //console.log(url);
      $(".thickbox", this).attr("href", url);
    });
    $(".thickbox").addClass("active");
  },

  fixList: function() {
    console.log($(".can-create").length);
    if($(".can-create").length) {
      console.log("criar lista");
      window.location = "/giftlist/create";
    } else {
      $(".giftlist-table > tbody > tr").each(function() {
        var id = $(".giftlist-body-id", this).html();
        //console.log("Id da lista: "+id);
        $(".giftlist-body-name a", this).attr("href", "/_secure/giftlist/product?id="+id);
        //$(".giftlist-body-name a").trigger("click");
        window.location = "/_secure/giftlist/product?id="+id;
      });
    }
  },

  mobFilters:function() {
    $(".mobPage #boxFiltros").before("<span id='btnMobFilter'>Filtrar</span>");
    jQuery(document).on("click", "#btnMobFilter", function (event) {
      $(".boxFiltroOrder > ul").css("display", "none");
      $(".boxFiltroOrder > h3").removeClass("active");
      $("#boxFiltros").slideToggle();
      $(this).toggleClass("active");
    });
    jQuery(document).on("click", ".boxFiltroOrder > h3", function (event) {
      $("#boxFiltros").css("display", "none");
      $("#btnMobFilter").removeClass("active");
      $(".boxFiltroOrder > ul").slideToggle();
      $(this).toggleClass("active");
    });

  },

  orderMobile:function() {
    // Cria select e dispara o evento para o controle padrão 
    var selectOrder = $('.orderBy select').first(); 
    $('.contOrdenar li a').each(function () { 
      var liLink = $(this).attr('href'); 
      $(this).click(function (e) { 
        e.preventDefault(); 
        selectOrder.val(liLink);
        selectOrder.trigger('change'); 
      }); 
    });
  },

  tempMiniCart: function(){
    cotyCall.miniCart();
    if($("body").hasClass("mobPage")) {
      //window.location = "/checkout/#/cart";
      $("body").append('<div id="showMobAdd" style="display: none;" class="modal fade" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content text-center"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><p>Produto adicionado com sucesso!</p></div></div></div><a style="display: none;" data-toggle="modal" data-target="#showMobAdd" class="linkMobAdd"></a>');
      $(".linkMobAdd").trigger("click");
      setTimeout(function(){
        $(".customBuy").removeClass("active");
        $("#showMobAdd .close").trigger("click");
        setTimeout(function(){$("#showMobAdd, .linkMobAdd").remove();}, 200);
      }, 4000);

    } else {
      $(".customBuy").removeClass("active");
      $(".top-interaction .cart-panel h2").addClass("show");
      $('html, body').animate({scrollTop : 0},300);
      $("body").append("<div id='whiteLayer'></div>");
      $("#whiteLayer").animate({"width":"100%"}, "fast");
      $(".cart-panel").removeClass("empty");
      $(".cart-panel").addClass("active activeTemp");
      setTimeout(function(){
        $(".cart-panel").removeClass("activeTemp");
        $(".top-interaction .cart-panel h2").removeClass("show");
        $("#whiteLayer").animate({"width":"0px"}, "fast");
      }, 6000);
    }
  },

  removeTags:function() {
    $('.productDescription div').contents().unwrap();
    $('.productDescription br').remove();
  },

  triggerWishlist: function() {
    $(".btn-wishlist").before("<span id='callWish'>Colocar na Wishlist <i class='fa fa-heart-o'></i></span>");

    jQuery(document).on("click", "#callWish", function (event) {
      if($("body").hasClass("loginOff")) {
        $(".welcome #login").trigger("click");
      } else {
        $(".glis-popup-link.glis-thickbox").trigger("click");
        setTimeout(function(){
          var create = $(".glis-create").length;
          console.log("Valro lista: "+create);
          if(create == 1) {
            //criar lista
            $(".glis-form-name").val("Wishlist");
            $(".glis-submit.glis-submit-new").trigger("click");
            setTimeout(function(){
              $("#TB_closeWindowButton").trigger("click");
            }, 5000);
          } else {
            //já existe lista criada
            $(".glis-submit.glis-submit-list").trigger("click");
            setTimeout(function(){
              $("#TB_closeWindowButton").trigger("click");
            }, 7000);
          }
          
        }, 1000);
        
      }
    });
    
    $(".glis-popup-link.glis-thickbox").click(function() {
      console.log("clicou");
    });
    $(document).on("ready", "#TB_window", function(){
       //console.log("I showed up");   
    });
  },

  brandFiltersForSearch: function() {
    (function(){

    var categories = [];
    var brands = [];

    function slugify(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\s-]/g, '-') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    }

    function getBrands(){

        /* Departments on page */
        $('.search-single-navigator h3').each(function(){categories.push($(this).text())});

            var done = categories.length;

            /*
            * Parallel calls
            * This code will never run if there are no categories available on the page.
            */
            $(categories).each(function() {
                var category = this;

                $.ajax({
                    url: '/api/catalog_system/pub/facets/search/'+category+'?map=c',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                }).done(function (data){
                    $(data["Brands"]).each(function(){
                        brands.push(this["Name"])
                    });
                }).error(function () {
                    /*
                     * Deal with timeouts/errors or just ignore and continue with what you have
                     * Most of the time, one category will contain the same brands as other categories.
                     * Seems like a doable trade-off.
                     */
                    console.log('Timeout/Error occurred. Ignoring...')
                }).always(function () {
                    done -= 1;
                    if(done ==0) $(document).trigger('brands.ready');
                })
            });
        }

        function getBrandTemplate(){
           var  uniqBrands = $.unique(brands);

           var htmlString = '<h3 class="marca"><span></span><a href="#" title="Marca">Marca</a></h3><ul class="marca">';

           $(uniqBrands).each(function(){
               htmlString += '<li data-value="'+slugify(this)+'"><a href="'+new URL(document.URL).pathname+'/'+slugify(this)+'?map=ft,b" title="'+this+'">'+this+'</a></li>';
           });

           return htmlString += '</ul';
        }

        function render(){
            $('.search-single-navigator').append(getBrandTemplate());
        }

        $(document).on("brands.ready",function(){
            render();
        });

        getBrands();

    })();
  },

  brandFiltersForSearchv2: function() {

    (function(){

        var categories = [];
        var brands = [];

        function slugify(text)
        {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/[^\w\s-]/g, '-') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
        }
        
        function getSearchQueryString()
        {
            var url = new URL(document.URL);

            return url.search.includes("spec") ? url.search+',b' : '?map=ft,b';        
        }

        function getSearchUrl(searchTerm){
            return new URL(document.URL).pathname+'/'+slugify(searchTerm)+getSearchQueryString();
        }

        function getBrands()
        {
            /* Departments on page */
            $('.search-single-navigator h3').each(function(){categories.push($(this).text())});

            var done = categories.length;

            /*
            * Parallel calls
            * This code will never run if there are no categories available on the page.
            */
            $(categories).each(function() {
                var category = this;

                $.ajax({
                    url: '/api/catalog_system/pub/facets/search/'+category+'?map=c',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    }
                }).done(function (data){
                    $(data["Brands"]).each(function(){
                        brands.push(this["Name"])
                    });
                }).error(function () {
                    /*
                     * Deal with timeouts/errors or just ignore and continue with what you have
                     * Most of the time, one category will contain the same brands as other categories.
                     * Seems like a doable trade-off.
                     */
                    console.log('Timeout/Error occurred. Ignoring...')
                }).always(function () {
                    done -= 1;
                    if(done ==0) $(document).trigger('brands.ready');
                })
            });
        }

        function getBrandTemplate()
        {
           var  uniqBrands = $.unique(brands);

           var htmlString = '<h3 class="marca"><span></span><a href="#" title="Marca">Marca</a></h3><ul class="marca">';

           $(uniqBrands).each(function(){
               htmlString += '<li data-value="'+slugify(this)+'"><a href="'+getSearchUrl(this)+'" title="'+this+'">'+this+'</a></li>';
           });

           return htmlString += '</ul';
        }

        function render()
        {
            $('.search-single-navigator').append(getBrandTemplate());
        }

        $(document).on("brands.ready",function(){
            render();
        });

        getBrands();

    })();

  },

  fixBack: function() {
    setTimeout(function(){
      $(".search-single-navigator > h4").each(function() {
        if(!$(this).hasClass("styleLabel01")) {
          var link = $("a", this).attr("href");
          if(link != undefined) {
            console.log("LINK: "+link);
            var linkRemove = link.substr(link.lastIndexOf('/') + 1); 
            var linkParameter = link.substr(link.lastIndexOf('?') + 1);
            link = link.replace(linkRemove, "");
            //console.log(link+"?"+linkParameter);
            link = link+"?"+linkParameter;
            $("a", this).attr("href", link);
          }
        }
      });
    }, 200);
  }, 

  mobList: function() {
    if( $(window).width() < 768) {
      $(".sidebar-template .nav-sidebar").before("<p id='btMobList'>Menu <span></span></p>");
      $(".coty-orders #btMobList span").html("Meus Pedidos");
      $(".coty-orders #link-pedidos a").addClass("active");
      $(".coty-profile #btMobList span").html("Meu Cadastro");
      $(".coty-profile #link-endereços a").addClass("active");
      $(".coty-address #btMobList span").html("Meus Endereços");
      $(".coty-address #link-endereços a").addClass("active");
      $(".coty-wishlist #btMobList span").html("Wishlist");
      $(".coty-wishlist #link-wishlist a").addClass("active");
      jQuery(document).on("click", "#btMobList", function (event) {
        $("#content .sidebar-template .nav").slideToggle();
      });
    }
  },

  closeLogin: function() {
    jQuery(document).on("click", "body.coty-login .modal-header .close.vtexIdUI-close", function (event) {
      history.back();
    });
  },

  fixDepartmentNumbers: function() {
    $(".coty-department .search-single-navigator > h4 a").each(function(){
      var name = $(this).html();
      name = name.replace(/ *\([^)]*\) */g, "");
      $(this).html(name);
    });
  },

  fixCategoryNumbers: function() {
    $(".coty-category .search-single-navigator > h4 + ul li a, .coty-category .search-single-navigator > h4 > a").each(function(){
      var name = $(this).html();
      name = name.replace(/ *\([^)]*\) */g, "");
      $(this).html(name);
    });
  },

  mobileMenu: function() {
    if (body.hasClass('mobPage')) {
      $("#link-search-open").click(function(event) {
        $("#link-search-opened").slideToggle();
        $(".topHeader").addClass("activeSearch");
      });

      $("#link-search-close").click(function(event) {
        $("#link-search-opened").slideToggle();
        $(".topHeader").removeClass("activeSearch");
      });

      $("li.listDrop").each(function(){
        var name = $("> a", this).html();
        var link = $("> a", this).attr("href");
        $("> ul > div > li", this).append("<a href='"+link+"' class='deptoPrinc'>ver todos</a>");
      });

      $(".listDrop > a").click(function(e) {
        e.preventDefault();

        if ($(this).hasClass('arrowMenu')) {
          console.log('fechar');
          $(this).removeClass("arrowMenu");
          $("+ ul", this).slideUp();
        }
        else {
          //console.log('abrir');
          var ul = $(this).closest('ul');
          ul.find('a').removeClass("arrowMenu");
          ul.find('ul:visible').slideUp("arrowMenu");
          
          $(this).addClass("arrowMenu");
          $("+ ul", this).slideDown();  

        }
        // $(this).toggleClass("arrowMenu");
        // $("+ ul", this).slideToggle();
      });

      $("#link-menu-mobile-close, #link-menu-mobile, #bgFake").click(function(event) {
        $("#menuList").toggleClass("active");
        $(".top-d-b").toggleClass("activeBg");
      });

      $("#footer-01-01 > span, #footer-01-02 > span").click(function() {
        $(this).toggleClass("arrowMenu");
        $("+ div", this).slideToggle();
      });
    }
  }, 

  brandsDescr: function() {

    $("ul#textos .marcaAdidas").addClass("active");

    //if (wdw.width() > 768) {
      // console.log('Desk e tal');
      $('#logos a').click(function(event) {
        tentandoCentralizar($(this));
      });

      //$('#logos .slick-arrow').click(function(event) {
      jQuery(document).on("click", "#logos .slick-arrow", function (event) {
        //selecionaCentral($("#logos .slick-active.slick-center > a").attr("class"));
        selecionaCentral();
      });


      $("#logos").on('afterChange', function (event, slick, currentSlide, nextSlide) {
          selecionaCentral();
          console.log("mudou");
      });

      


    //}
    /*else {
      // console.log('Mó baile');
      ///$(".ul#logos li a").click(function(){
      jQuery(document).on("click", "ul#logos li a", function (event) {
        selecionaCentral();
      });
    }*/
  },

  flagPreco: function() {
    // console.log('teste de preço');
    $('.prateleira li, .shelf li').each(function(){
      var precoDe = $('.flagPreco', this).text(); 
      precoDe = precoDe.replace(',', '.').replace('%', '');
      console.log(precoDe);
      var precoDe2 = Math.round(parseFloat(precoDe));
      $('.flagPreco', this).after('<div class="etiquetaValorDesconto">-'+precoDe2+'%</div>');
      $('.flagPreco', this).remove();
    });
  },

  customPrat: function() {
    var cor = $(".prateleira02 #prateleiraEspecCor").html();
    $(".prateleira02").css("background-color", cor);
  },

  customPratPrata: function() {
    var cor = $("#prateleiraPrataCor").html();
    $("#produtos.col-sm-9").css("background-color", cor);
  },

  customPratOuro: function() {
    var cor = $("#prateleiraOuroCor").html();
    $("#ouroBackgroundColor").css("background-color", cor);
  },

  sliderVideo: function(a) {
    var element = $(a);

    if ( $(window).width() <= 768) {

      //element.parent().find('#videoShow #areaTexto').after('<div id="areaSlider"></div>');
      element.parent().find('#videoShow').after('<div id="areaSlider"></div>');
      //$('#areaSlider').append(element.clone());
     // element.clone().appendTo( "#areaSlider" );
      $('#areaSlider').html($(".videosHome > div > ul").clone());
      //$( ".videosHome > div > ul" ).appendTo( "#areaSlider" );

      element = $('#areaSlider ul');
      //element = $('#areaSlider + ul');

      /*element.each(function(i, el) {
        var name = $(this).find('p');
        $qtdChar = 30;
        if ( name.text().trim().length > $qtdChar) {
          name.succinct({
            size: $qtdChar,
          }); 
        }      
      });*/

    }
    

    // $(a).slick({
    element.slick({
        dots: true,
        // infinite: false,
        infinite: true,
        speed: 800,
        arrows: !0,
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        verticalSwiping: true,
        centerMode: true,
        centerPadding: '0px',
        draggable: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: false,
                verticalSwiping: false,
                draggable: true,
                // centerMode: false,
              }
            },
          ]
    });

    $('#areaSlider .slick-dots li button').click(function(event) {
      var valor = $(this).attr("aria-controls");
      $('#areaSlider li#'+valor).trigger("click");
    });

    $('#areaSlider .slick-next.slick-arrow').click(function(event) {
      $("#areaSlider .slick-track .slick-active").prev().trigger("click");
    });

    $('#areaSlider .slick-prev.slick-arrow').click(function(event) {
      $("#areaSlider .slick-track .slick-active").prev().trigger("click");
    });

    // colocar borda no primeiro central
    $('#areaSlider .slick-slide.slick-active.slick-center').addClass("active");

    //element = $('#areaSlider');
    // var element = a;
    // $(a).find('li').click(function(event) {
    element.find('li.slick-slide').click(function(event) {

      $('#areaSlider li').removeClass("active");
      $(this).addClass("active");
      var customVideo = $(".linkVideo", this).html();
      var customLogo = $(".linkLogo", this).html();
      var customTexto = $(".linkTexto", this).html();
      var customMarca = $(".linkMarca", this).html();
      //var customProdutos = $(".videosHome > div > ul li:first .linkProdutos", this).html();
      var customProdutos = $(".linkProdutos", this).html();
      $("#videoShow #areaVideo").html('<iframe width="600" height="336" src="'+customVideo+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
      $("#videoShow #areaTexto").html('<img src="'+customLogo+'" /><p>'+customTexto+'</p><a href="'+customMarca+'">conhecer a marca</a><a href="'+customProdutos+'">ver os produtos</a>');
      
      var este = $(this);
      tentandoCentralizar(este);
      console.log("link: "+customProdutos);

    });

  },

  videoCustom: function() {
    $(".videosHome > div > ul li:first").addClass("active");
    var firstVideo = $(".videosHome > div > ul li:first .linkVideo").html();
    var firstLogo = $(".videosHome > div > ul li:first .linkLogo").html();
    var firstTexto = $(".videosHome > div > ul li:first .linkTexto").html();
    var firstMarca = $(".videosHome > div > ul li:first .linkMarca").html();
    var firstProdutos = $(".videosHome > div > ul li:first .linkProdutos").html();
    $("#videoShow #areaVideo").html('<iframe width="600" height="336" src="'+firstVideo+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
    $("#videoShow #areaTexto").html('<img src="'+firstLogo+'" /><p>'+firstTexto+'</p><a href="'+firstMarca+'">conhecer a marca</a><a href="'+firstProdutos+'">ver os produtos</a>');
    jQuery(document).on("click", ".videosHome > div > ul li", function (event) {
      $(".videosHome > div > ul li").removeClass("active");
      $(this).addClass("active");
      var customVideo = $(".linkVideo", this).html();
      var customLogo = $(".linkLogo", this).html();
      var customTexto = $(".linkTexto", this).html();
      var customMarca = $(".linkMarca", this).html();
      //console.log("Link video: "+customVideo);
      //var customProdutos = $(".videosHome > div > ul li:first .linkProdutos", this).html();
      var customProdutos = $(".linkProdutos", this).html();
      $("#videoShow #areaVideo").html('<iframe width="600" height="336" src="'+customVideo+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
      $("#videoShow #areaTexto").html('<img src="'+customLogo+'" /><p>'+customTexto+'</p><a href="'+customMarca+'">conhecer a marca</a><a href="'+customProdutos+'">ver os produtos</a>');
    });
  },

  infinityScroll: function() {

    //var contTempo = 1;
    //var tempo = 3000;

    var quantidade = $(".shelf > .shelf:last > ul > li").length;
    if(quantidade < 20){
       //console.log("não tem mais resultados");
       $(".loadProd").addClass('noResults').text("Não existem mais resultados");
    }

    $(".shelf[id*=ResultItems]").QD_infinityScroll({

      lastShelf: ">div:last",
      callback: function () {
        $(".helperComplement").remove();
        $('.shelf li').before(function(){
          var precoDe = $('.flagPreco', this).text();
          precoDe = precoDe.replace(',', '.').replace('%', '');
            var precoDe2 = Math.round(parseFloat(precoDe)); 
              $('.flagPreco', this).after('<div class="etiquetaValorDesconto">-'+precoDe2+'%</div>');
            $('.flagPreco', this).remove();
        });
        /*if($(".loadProd").hasClass('noResults')){
          $(".loadProd").removeClass('noResults').text('Ver mais produtos');
          $(".loadProd").css('opacity','1');
        }
        else {
          $(".loadProd").css('opacity','1');
        }*/
        //corrigeAlturadoNomedoProduto();
        var quantidade = $(".shelf > .shelf:last > ul > li").length;
        if(quantidade < 20){
           console.log("não tem mais resultados");
           $(".loadProd").addClass('noResults').text("Não existem mais resultados");
        }
        $(".loadProd").removeClass("hide");
      },
      paginate: function (moreResults) {
        /*jQuery(document).on("click", ".loadProd", function(moreResults){

          console.log("moreResults");
          return moreResults;
        });*/
        $(".loadProd").click(moreResults);
        /*$(".loadProd").click(function(){
          
          $(".loadProd").css('opacity','0');
          function loopLoadBt() {
            switch( $('#scrollLoading').is(':visible') ) {
                case false:
                    console.log('invisivel');
                    setTimeout(function() {
                      if ($(".loadProd").css('opacity') === '0' ) {
                        $(".loadProd").addClass('noResults').text("Não existem mais resultados");
                        $('.noResults').css('opacity', '0.5');
                      }
                    }, contTempo*tempo);
                    break;
                default:
                    setTimeout(function(){
                      loopLoadBt();
                    },100);                    
            }
          }loopLoadBt();
          contTempo++;
          if (contTempo > 5) {
            contTempo = 5;
          }
        });*/
      }
    });

    


  },

  qtdProducts: function() {
    var qtd = $(".searchResultsTime .resultado-busca-numero .value").html();
    if(qtd == 1) {
      $(".main .sub").append("<p class='qtdProdCat'>"+qtd+" produto</p>");
    } else {
      $(".main .sub").append("<p class='qtdProdCat'>"+qtd+" produtos</p>");
    }
  }, 

  customCheckFilters: function(){
    $(".search-filter-button").after("<span id='tagFiltros'>Filtre por:</span>");
    $(".search-multiple-navigator fieldset label").each(function(){
      var id = $("input", this).attr("name");
      $("input", this).attr("id", id);
      $("input", this).after("<label for='"+id+"'></label>");
    });
    $(".search-multiple-navigator fieldset > h5").each(function(){
      var name = $(this).html();
      name = name.replace(/[^\w\s]/gi, ''); // remover caracteres especiais
      name = name.replace(/\s/g, "-"); //troca espaço por -
      $(this).parent("fieldset").addClass(name);
    });
  },

  customCheckAccount: function(){
    $(".form-personal-data-gender > .controls label").each(function(){
      var id = $("input", this).attr("value");
      $("input", this).attr("id", id);
      $("input", this).after("<label for='"+id+"'></label>");
    });
  },

  testeThumb: function() {
      $(".cores .similar .data-similar").each(function(){
        var id = $(this).attr("data-id");
        var $that = $(this);
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://lojacoty.vtexcommercestable.com.br/api/catalog_system/pvt/products/"+id+"/specification",
          "method": "GET",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/vnd.vtex.ds.v10+json"
          }
        }

        $.ajax(settings).done(function (response) {
          //console.log(response);
          var tam = response.length;
          for (i = 0; i < tam; i++) { 
             //console.log("valor: "+response[i].Name);
             if(response[i].Name == "Thumb") {
                //console.log(response[i].Value[0]);
                //$($that).html("<img src='/arquivos/"+response[7].Value[0]+"' />");
                $($that).html("<img src='/arquivos/"+response[i].Value[0]+"' />");
             }
          }
        });
      });
  },

  buyButton: function() {

    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){ 
      var disp = product.available; 
      if(disp == false) {
          $(".linkAddAoCarrinho, .clonedBt").css("display","none");
      } else {
        $(".buy-button").before("<p class='alertProd'></p><a class='clonedBt'>Comprar</a>");
      }
    });

    $(".skuList label").click(function(){
      setTimeout(function(){ 
        //show buy button
        if($(".sku-notifyme").attr("style") == "display: block;") {
            $(".linkAddAoCarrinho, .clonedBt").css("display","none");
            $(".alertProd").html("");
        } else {
            $(".linkAddAoCarrinho, .clonedBt").css("display","block");
            $(".alertProd").html("");
        }
      }, 200);
    });

    // add itens
    $(".addMais").click(function(){
    var atual = parseInt($(".addMais").parent().prev(".showValue").val());
        atual = atual + 1;
        $(".addMais").parent().prev(".showValue").val(atual);
        $("#ctl00_Conteudo_upnlContent .quantity input").val(atual);
        $("#calculoFrete .freight-values").css("display", "none");
    });

    // remove itens
    $(".addMenos").click(function(){
        var atual = parseInt($(".addMenos").parent().prev(".showValue").val());
        if (atual == 1) {
            $(".addMenos").parent().prev(".showValue").val("1");
            $("#ctl00_Conteudo_upnlContent .quantity input").val("1");
        } else {
            atual = atual - 1;
            $(".addMenos").parent().prev(".showValue").val(atual);
            $("#ctl00_Conteudo_upnlContent .quantity input").val(atual);
        }
        $("#calculoFrete .freight-values").css("display", "none");
    });

    //call modal
    jQuery(document).on("click", ".clonedBt, .clonedBtKit", function (event) {

        var hrefCart = $(".buy-button").attr("href");
        var message = "javascript:alert('Por favor, selecione o modelo desejado.');";
        var qtd = $(".showValue").val();
        if(hrefCart == message){
          $(".alertProd").html("<span>Selecione uma opção</span>");
        } else {

          $(".alertProd").remove();
          //console.log(hrefCart);
          var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
          //var qtd = $(".showValue").val();
          console.log("resUTL: "+resUTL+" Qtd: "+qtd);
          setTimeout(function(){ 
            vtexjs.checkout.getOrderForm().then(function(){
              var item = {
                  id: resUTL,
                  quantity: qtd,
                  seller: 1
              };
              vtexjs.checkout.addToCart([item]).done(function(orderForm){

                window.location = "/checkout#/cart";

                //console.log(item.quantity);
                //var qtdCart = item.quantity;
                //$(".linkModalBuy").trigger("click");

                //atualiza quantidade
                /*vtexjs.checkout.getOrderForm().then(function(orderForm) {
                   var qtdCart = orderForm.items.length;
                   qtdCart = "("+qtdCart+")";
                   $(".link-cart").attr('data-content',qtdCart);
                });*/

              });
            });
          }, 1000);
        }
    });

    //block letters
    $(".showValue").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

  },

  brandPosition: function() {
    $(".product-title .productName").append(" - ");
    var brand = $(".product-title .brandName").html();
    $(".product-title .productName").append(brand);
  },

  loadShipping: function() {
    ShippingValue();
  },

  toggleDesc: function() {
    //$(".coty-product .panel > h4").click(function(){
    jQuery(document).on("click", ".coty-product .panel > h4", function (event) {
      $("+ div", this).slideToggle();
      $(this).toggleClass("active");
      $(this).parent().toggleClass("activeToggle");
    });
    $("#caracteristicas tr th").click(function(){
      $("+ td", this).slideToggle();
      $(this).toggleClass("active");
    });
  },

  customHello: function() {
    setTimeout(function(){
      //var name = $(".span4.profile-detail-display > h5").html();
      $("#welcomeLink p.welcome em").remove();
      var name = $("#welcomeLink p.welcome").html();
      //name = name.replace(/ /g,'');
      //name = name.replace(/ /g,'');
      name = String(name).replace('Olá ',''); // remobe olá
      name = String(name).split(/\s+/); 
      //name = name.replace(","," ");
      name = String(name).replace(/,/g , " ");
      name = name.slice(1, -2); // remove . ultimo char
      //console.log("name:"+name)
      var qtd = countWords(name);
      if(qtd < 2) {
        var letter = name.substring(0, 2);
        $("ul.menuLat").prepend("<div id='boxName'><span>"+letter+"</span><p>Olá, "+name+"</p></div>");
      } else {
        var letter1 = name.substring(0, 1);
        var letter2 = lastLetter(name).substring(0, 1);
        $("ul.menuLat").prepend("<div id='boxName'><span>"+letter1+letter2+"</span><p>Olá, "+name+"!</p></div>");
        //console.log(letter1+letter2);
      }
    }, 1500);
  },

  customUpdateBt: function() {
    jQuery(document).on("click", ".address-update", function (event) {
      $(".modal-backdrop").remove();
    });
  },  

  wrapInsta: function() {
    $(".instagramHome > iframe").wrap("<div class='newInsta'></div>");
  },

  findVideo: function() {
    if($(".value-field").hasClass("Video")) {
      var videoLink = $(".value-field.Video").html();
      $(".thumbnail .lastThumb").css("display", "block").addClass("thumbVideo");
      console.log("link do video"+videoLink);
    } 
  },

  shareButtons: function() {
    var link = window.location;
    var name;
    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
      name = product.name;
    });
    //console.log("link: "+link);
    $("#shareFacebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u="+link).attr("target", "_blank");
    $("#shareTwitter").attr("href", "https://twitter.com/share?url="+link).attr("target", "_blank");
    $("#shareWhats").attr("href", "whatsapp://send?text="+link+" "+name);
  },

  fixBreadcrumb: function() {
    var name = $(".productName").html();
    //$(".bread-crumb ul").append("<li class='lastOk'><strong><a href='javascript:void();' title='"+name+"'>"+name+"</a></strong></li>");
    $(".mobPage .breadcrumb-wrapper").after($(".product-title"));
    $(".mobPage .product-title").after($("#avaliacaoStars"));
    if (!$('body').hasClass('mobPage') && wdw.width() <= 900 ) {
      $(".breadcrumb-wrapper").after($(".product-title"));
      $(".product-title").after($("#spnRatingProdutoTop"));
    }
  },

  bannerMobile: function () {
    setTimeout(function () {
      if($("body").hasClass("mobPage")) {
        $("#boxName").prepend("<img src='/arquivos/coty-banner-account-001-mob.jpg' />");
      }
    }, 2000);
    
  },

  carrosselThumbsNails: function(a) {

    $(a).slick({
          infinite: false,
          speed: 800,
          arrows: !0,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            }
          ]
    });

  },

  carrosselThumbsNails2: function(a) {

    //$(".ce-thumbs > ul:first").owlCarousel({
    $(a).owlCarousel({ 
        loop:false,
        margin:0,
        nav:true,
        responsive:{
            0:{
                items:5
            },
            600:{
                items:5
            },
            1000:{
                items:5
            }
        }
    });

    /*$(".ce-thumbs > ul:first").owlCarousel({
      //navigation : true, 
      slideSpeed : 300,
      paginationSpeed : 400,
      //singleItem:true,
      //auto: true,
          //pause: 200
          items:4,
        loop:true,
        margin:10,
        autoPlay:true
    });*/

  },

  simuladorDeEsmaltes: function() {

    // carroseel nos thumbs
    setTimeout(function(){
      cotyCall.carrosselThumbsNails2(".ce-thumbs > ul:first");
    }, 200);

    //ativar cores
    $(".ce-thumbs ul").first().addClass("show");

    //ativar foto
    var thumbFirst = $(".ce-thumbs ul:first li:first").attr("id");
    //console.log(nameFirst);
    thumbFirst = thumbFirst.replace("ce-thumb-","");
    thumbFirst = "ce-" + thumbFirst;
    //console.log("#"+nameFirst);
    $("#"+thumbFirst).addClass("show");
    //ce-thumb-branco-bianco-purissimo
    //ce-branco-bianco-purissimo

    //ativar texto
    var nameFirst = $("#"+thumbFirst+" p").html();
    $("#ce-nome-produto").html(nameFirst);

    //ativar skin
    $("#simuladorEsmEsq").prepend("<img src='/arquivos/ce-skin-big-claro.jpg' id='skin001' /><img src='/arquivos/ce-skin-big-claro-2.jpg' id='skin002' /><img src='/arquivos/ce-skin-big-medio.jpg' id='skin003' /><img src='/arquivos/ce-skin-big-escuro.jpg' id='skin004' /><img src='/arquivos/ce-skin-big-escuro-2.jpg' id='skin005' />")
    $("#skin001").addClass("show");

    // escolher skin
    $("#ce-tom-01").click(function(){
      $("#simuladorEsmEsq > img").removeClass("show");
      $("#skin001").addClass("show");
    }); 
    $("#ce-tom-02").click(function(){
      $("#simuladorEsmEsq > img").removeClass("show");
      $("#skin002").addClass("show");
    }); 
    $("#ce-tom-03").click(function(){
      $("#simuladorEsmEsq > img").removeClass("show");
      $("#skin003").addClass("show");
    }); 
    $("#ce-tom-04").click(function(){
      $("#simuladorEsmEsq > img").removeClass("show");
      $("#skin004").addClass("show");
    }); 
    $("#ce-tom-05").click(function(){
      $("#simuladorEsmEsq > img").removeClass("show");
      $("#skin005").addClass("show");
    }); 

    // escolher foto
    $(".ce-thumbs > ul li").click(function(){
      var thumb = $(this).attr("id");
      thumb = thumb.replace("ce-thumb-","");
      thumb = "ce-" + thumb;
      $("#simuladorEsmEsq > ul > li").removeClass("show");
      $("#"+thumb).addClass("show");
      //ativar texto
      var name = $("#"+thumb+" p").html();
      $("#ce-nome-produto").html(name);
    }); 

    //escolher cor

    $("#ce-cores-branco").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick(); 
      cotyCall.carrosselThumbsNails2(".ce-thumbs-branco");
      $(".ce-thumbs-branco").addClass("show"); 
    });    
    $("#ce-cores-rosas").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-rosa");
      $(".ce-thumbs-rosa").addClass("show"); 
    });
    $("#ce-cores-vermelhos").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-vermelho");
      $(".ce-thumbs-vermelho").addClass("show"); 
    });
    $("#ce-cores-escuros").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-escuros");
      $(".ce-thumbs-escuros").addClass("show"); 
    });
    $("#ce-cores-nudes").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-nudes");
      $(".ce-thumbs-nudes").addClass("show"); 
    });
    $("#ce-cores-terrosos").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-terroso");
      $(".ce-thumbs-terroso").addClass("show"); 
    });
    $("#ce-cores-coloridos").click(function(){
      $(".ce-thumbs > ul").removeClass("show"); 
      $(".ce-thumbs > ul").unslick();  
      cotyCall.carrosselThumbsNails2(".ce-thumbs-colorido");
      $(".ce-thumbs-colorido").addClass("show"); 
    });

    $.fn.unslick = function() {
        var _ = this;
        return _.each(function(index, element) {

          if (element.slick) {
            element.slick.destroy();
          }

        });
    };
  
  },

  corrigeAlturadoNomedoProduto: function() {
    var $shelf = $('.vitrine, .prateleira');
    if ( $('body').find($shelf).length > 0 ) {
      const $qtdChar = 58;
      $shelf.find('li').each(function(i, el) {
        var name = $(this).find('.productName > a');
        if ( name.text().trim().length > $qtdChar) {
          name.succinct({
            size: $qtdChar,
          }); 
        }      
      });
    }
  },

  msgMediaAvaliacao: function () {
    wdw.load(function() {

      var iola = $('#opiniao_de_usuario .media em span').text();
      iola = iola.replace('votos','').replace(/ /g,'');
      iola2 = iola.replace('voto','').replace(/ /g,'');
      iola3 = iola.replace(/(\r\n\t|\n|\r\t)/gm,"");
      if (iola2 == 1) {
        $('#avaliacaoStars').append('<span class="votos" style="display:none;">('+iola2.trim()+' avaliação)</span>');
        $('#avaliacaoStars .votos').fadeIn();
      } else if (iola > 1) {
        $('#avaliacaoStars').append('<span class="votos" style="display:none;">('+iola.trim()+' avaliações)</span>');
        $('#avaliacaoStars .votos').fadeIn();
      } else if (iola3 == "nenhumvoto") {
        $('#avaliacaoStars').append('<span class="votos" style="display:none;">(produto não avaliado)</span>');
        $('#avaliacaoStars .votos').fadeIn();
      }
    });
  },

  detalheInputFrete: function () {

    wdw.load(function() {
      var $input = $('#calculoFrete #txtCep');
      var $btOk = $('#calculoFrete #btnFreteSimulacao');
      var teclada;

      var valInicial = $input.val();

      $input.keyup(function(event) {
        teclada = $input.val();

        if ( teclada != '_____-___') {
          console.log('diferente');
          $btOk.addClass('active');
        }
        else {
          console.log('igual');
          $btOk.removeClass('active');
        }

      });

    });    
  },

  eliminandoTipoDasCaracteristicas: function () {
    $('#caracteristicas tr th.Tipo').parent().hide();
    $('#caracteristicas').addClass('complete');
  },

  instagramResponsivo: function () {

    //var conta = 'cotyinc';
    var conta = $(".instagramMain").html();
    var link = 'https://www.instagram.com/'+conta;

    var diretrizes = {
      place: $('.instagramMain'),  
      view1: {
        codigo: 'd807733038075b21d25582a400509ae6458256fa16b28ce59ac1c657ba3a746b',
        qtdItensHorizontais: 2,
        qtdItensVerticais: 2,
      },
      view2: {
        codigo: '4ab07d2fa4415133e1516da773d2ed600218a99acfd4b288c8b77d8c60a8f2f1',
        qtdItensHorizontais: 3,
        qtdItensVerticais: 2,
      },
      view3: {
        codigo: '5c5cb2b8a796ca37b62608a1262c1cfdebfe769de7975ffc22160538d8538987',
        qtdItensHorizontais: 4,
        qtdItensVerticais: 2,
      },
    }

    injetaScriptdoInstawidget(diretrizes);

    diretrizes.place.prepend(
      '<a href="'+link+'">@'+conta+'</a>'
    );

    diretrizes.place.append(
      '<a href="'+link+'" target="_blank">Ver mais fotos</a></div>'
    );
  },

  fixBannerHeight: function() {
    if($("body").hasClass("mobPage")){
      setTimeout(function() {
        var altura = $(".coty-category #bannerPrincipal > div.cotyMob > div").outerHeight();
        //console.log("altura: "+altura);
        $(".coty-category #bannerPrincipal > div.cotyMob h1").css("height", altura+"px").css("line-height", altura+"px");
        var altura2 = $(".coty-category .banner-template > div.cotyDesk > div").outerHeight();
        $(".coty-category #btnMobFilter").css("top", altura2+"px");
        var altura3 = Number(altura2 + 39);
        $(".coty-category #boxFiltros").css("top", altura3+"px");
        //console.log("altura2: "+altura2);
        if($("body").hasClass("coty-silver")){
            var altura = $(".coty-silver .banner-template .cotyMob > div").outerHeight();
            console.log("altura: "+altura);
            $(".coty-silver #btnMobFilter").css("top", altura+"px");
            altura = altura + 40;
            $(".coty-silver #boxFiltros").css("top", altura+"px").css("left", "4px");
        }
      }, 500);
    }
  },

  changeSocialPlace: function() {

    if($("body").hasClass("mobPage")) {
      $(".product-details").append($(".product-details .share"));
    }
    
  },  

  menuInstitucional: function() {
    if($("body").hasClass("mobPage")) {
      $("#content .sidebar").prepend("<span id='menuInst'>Navegue</span>");
      jQuery(document).on("click", "#menuInst", function (event) {
        $(".menuLat").slideToggle();
        $(this).toggleClass("active");
      });
    }
  },

  productBrandList: function (brand) {

      if (brand == 'Cenoura e Bronze') {
          return {
              image: '/arquivos/cenoura_e_bronze.jpg',
              desc: '<p>Cenoura & Bronze \xE9 uma marca brasileira de cuidados com o sol, famosa pelo seu \xF3leo de bronzeamento desde 1978.</p> Ele expandiu sua linha de prote\xE7\xE3o e agora oferece uma gama completa de cuidados com o sol com um esp\xEDrito de ver\xE3o divertido.'
          };
      }

      if (brand == 'Bozzano') {
          return {
              image: "/arquivos/bozzano.jpg",
              desc: '<p>Uma marca brasileira tradicional para homens - fundada em 1946 - A Bozzano \xE9 l\xEDder de mercado em produtos de barbear, grooming e hair styling masculinos no Brasil.</p> A marca aderiu \xE0 fam\xEDlia Coty no final de 2015.'
          };
      }

      if (brand == 'Paixão') {
          return {
              image: "/arquivos/paixao.jpg",
              desc: '<p>Paix\xE3o oferece uma experi\xEAncia sensorial completa oferecendo lo\xE7\xE3o corporal e \xF3leo corporal com fragr\xE2ncias \xE0 base de perfumaria fina em embalagens \xFAnicas.</p> Juntou-se \xE0 fam\xEDlia Coty no final de 2015.'
          };
      }

      if (brand == 'Monange') {
          return {
              image: "/arquivos/monange.jpg",
              desc: '<p>Presente no mercado h\xE1 mais de 50 anos, a Monange possui heran\xE7a e tradi\xE7\xE3o no Brasil e est\xE1 presente diariamente pela mulher devido ao seu vasto perfil de marca na higiene pessoal feminina.</p> Uma mulher que usa Monange est\xE1 sempre buscando sua intui\xE7\xE3o e seguindo seu cora\xE7\xE3o de uma maneira confiante. Assim, nossa marca se esfor\xE7a para tirar o melhor proveito de cada mulher, aumentando seu desejo de evoluir. N\xF3s nutrimos seu corpo, mente e cora\xE7\xE3o.'
          };
      }

      if (brand == 'Risqué') {
          return {
              image: "/arquivos/risque_comercial.jpg",
              desc: "<p>Risqué é a marca de esmaltes # 1 no Brasil, o topo da mente e a categoria feminina, com mais de 60 anos de história.</p> A marca é pioneira no lançamento de tendências, é uma referência para milhões de consumidores brasileiros e inspira as mulheres a pintar o mundo com mais cores. A Risqué possui um portfólio completo com mais de 100 cores hipoalergênicas, uma linha de tratamento e diferentes coleções de tendências."
          };
      }

      if (brand == 'Koleston') {
          return {
              image: "/arquivos/koleston.jpg",
              desc: '<p>Wella Koleston \xE9 a primeira tintura em creme do mundo.</p> A marca sempre est\xE1 em busca de inova\xE7\xF5es, garantindo a qualidade de sua formula\xE7\xE3o.'
          };
      }

      if (brand == 'Adidas') {
          return {
              image: "/arquivos/adidas.png",
              desc: '<p>A Adidas é líder global na indústria de artigos esportivos com as principais marcas Adidas e Reebok.</p> Com sede em Herzogenaurach, na Alemanha, o Grupo emprega mais de 60 mil pessoas em todo o mundo e gerou 19 bilhões de euros em vendas no ano de 2016.'
          };
      }

      if (brand == 'Biocolor Homem') {
          return {
              image: "/arquivos/biocolor-homem.png",
              desc: '<p>Por mais de 60 anos no mercado de cores do cabelo, a Biocolor oferece a melhor proposta para as pessoas que querem uma alternativa simples e prática para mudar a cor do cabelo em casa.</p> Com apenas 20 minutos de ação, a Biocolor ajuda os homens e mulheres nesta transformação de forma rápida e fácil e oferece a melhor relação preço-desempenho.'
          };
      }

      if (brand == 'Bitufo') {
          return {
              image: "/arquivos/bitufo.png",
              desc: '<p>Bitufo é uma marca especializada em higiene bucal avançada e conta com um portfólio completo e desenvolvido especialmente para atender cada necessidade dos consumidores e da classe odontológica.</p> Bitufo é líder absoluto de mercado, no segmento de escovas interdentais.'
          };
      }

      if (brand == 'David Beckham') {
          return {
              image: "/arquivos/david-beckham.png",
              desc: '<p>Seu nome desperta entusiasmo.</p> <p>Sua carreira se estende ao mundo do esporte, moda e glamour. </p> <p>Sua imagem reflete o homem moderno: uma mistura suave de estilo e masculinidade.</p> <p>Ele é David Beckham.</p> <p>Para refletir esse estilo de vida moderno e flexível, as fragrâncias David Beckham promovem uma nova expressão de masculinidade, cheia de personalidade, estilo e sensualidade.</p>A marca oferece uma ampla variedade de perfumes para aqueles que, assim como David Beckham, buscam múltiplas facetas e muita modernidade.'
          };
      }

      if (brand == 'Leite de Colonia') {
          return {
              image: "/arquivos/leite-de-colonia.png",
              desc: '<p>Presente no mercado desde 1948, Leite de Colônia é uma tradicional marca de produtos para o cuidado facial desenvolvidos especialmente para auxiliar na limpeza profunda da pele e mantê-la protegida contra as agressões externas.</p> Sua primeira fórmula foi desenvolvida há 65 anos pelo Dr. Arthur Studart, que além de médico, foi farmacêutico, bacharel em direito e industrial. Na época, Studart era presidente da empresa Studart & Cia, proprietária dos Laboratórios Leite de Colônia, no Rio de Janeiro.'
          };
      }

      if (brand == 'Playboy') {
          return {
              image: "/arquivos/playboy.png",
              desc: '<p>Provocativo e sedutor. As fragrâncias de Playboy promovem liberdade e desafiam convenções. A marca oferece uma grande variedade de perfumes para uma vida mais prazerosa. Aproveite!</p> Provocadores e espíritos livres encontram nas fragrâncias de Playboy uma coleção de produtos que os acompanham na missão de alcançar seus sonhos. A vida é um jogo, então se destaque e deixe sua marca.'
          };
      }

      if (brand == 'Sanifill') {
          return {
              image: "/arquivos/sanifill.png",
              desc: '<p>Sanifill oferece uma linha completa de produtos para cuidado bucal diário de adultos e crianças.</p> Uma marca de produtos acessíveis, eficientes, com design diferenciado e opções portáteis e práticas. Sanifill é a 2º marca mais vendida, no segmento de fios dentais.'
          };
      }

      if (brand == 'York') {
          return {
              image: "/arquivos/york.png",
              desc: '<p>Uma linha completa de produtos de saúde e bem estar desenvolvida com a mais alta qualidade para cuidar de toda a família.</p>'
          };
      }  

      if (brand == 'Lucretin') {
          return {
              image: "/arquivos/coty-marca-lucretin.png",
              desc: '<p></p>'
          };
      }  
  },

  productBrand: function(){
    var brand = $(".productName .brand").html();
    //console.log("brand: "+brand);
    var brandTxt = cotyCall.productBrandList(brand);
    //console.log(brandTxt);
    if($("body").hasClass("coty-custom-product")){
      $("#product-details > .container-center:first-of-type").append("<div class='panel toggle brandToggle'><h4>Marca</h4><div class='productDescription productDescriptionBrand'><div class='logo'><img src='"+brandTxt.image+"' /></div>"+brandTxt.desc+"</div></div>");
    } else {
      $("#product-details").append("<div class='panel toggle brandToggle'><h4>Marca</h4><div class='productDescription productDescriptionBrand'><div class='logo'><img src='"+brandTxt.image+"' /></div>"+brandTxt.desc+"</div></div>");
    }
  },

  wrapBtSearch: function() {
    $(".btn-buscar").wrap("<span class='wrapSearchBt'></span>");
  },

  descriptionHeight: function() {
    var alt = $(".descPrincipal .productDescription").height();
    //console.log("alt: "+alt);
    if(alt > 160) {
      $(".descPrincipal").addClass("toggleDescr");
      //console.log("tem bastante descrição");
      $(".descPrincipal .productDescription").after("<span class='moreText'></span>");

      $(".moreText").click(function(){
          $(".descPrincipal .productDescription, .moreText").toggleClass("activeMore");
      });

    } 
  },

  fixMobPrice: function() {
    if($("body").hasClass("mobPage")){
      var clone = $(".descricao-preco").html();
      $("body").append("<div id='fixedPricesProd'><div class='prices'>"+clone+"</div><span id='triggerBuy'>Comprar</span></div>");

      jQuery(document).on("click", "#fixedPricesProd", function (event) {
        $(".clonedBt").trigger("click");
      });
    }
  },

  instaFeed: function() {
    // generate access token: http://instagram.pixelunion.net/
    //var token = '319668430.1677ed0.3961aafbba0842acb251cd19bad5ce77', 
    var token = $(".instagram .instagram-token").html();
    var userid = $(".instagram .instagram-id").html();
    var name = $(".instagram .instagram-nome").html();
    var num_photos, num_photos_aux;
    if($("body").hasClass("coty-product-insta") || $("body").hasClass("coty-custom-product")){
      num_photos = 5; 
    } else {
      num_photos = 10; 
    }
    
    num_photos_aux = num_photos + 1; 

    $.ajax({
      //url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', 
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+token,
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos_aux},
      success: function(data){
        //console.log(data);
        /*for( x in data.data ){
          $('#instafeed').append('<a href="'+data.data[x].link+'" target="_blank"><img src="'+data.data[x].images.low_resolution.url+'"></a>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
          // data.data[x].images.thumbnail.url - URL of image 150х150
          // data.data[x].images.standard_resolution.url - URL of image 612х612
          // data.data[x].link - Instagram post URL 
        }*/
        $(".instagramMain").html( "<div class='instafeedPhotos'></div>" );
        for (i = 0; i < num_photos; i++) { 
            $('.instafeedPhotos').append('<a data-href="'+data.data[i].link+'" class="insta-photos"><img src="'+data.data[i].images.low_resolution.url+'"></a>');
        }
        $(".instagramMain").prepend("<a href='https://www.instagram.com/"+name+"' target='_blank' class='insta-name'>"+name+"</a>");
        $(".instagramMain").append("<a href='https://www.instagram.com/"+name+"' target='_blank' class='insta-link'>Ver mais fotos</a>");
        //cotyCall.sliderInstagram("#instafeed");

        var larg = $(".instagramMain > div a").width();
        console.log("largura: "+larg);
        $(".instagramMain > div a").css("height", larg+"px");
      },
      error: function(data){
        console.log(data); 
      }
    });

    //var windowSizeArray = [ "width=200,height=200", "width=300,height=400,scrollbars=yes" ];

    jQuery(document).on("click", ".insta-photos", function (event) {
      var url = $(this).attr("data-href");
      //console.log(url);
      var w = 830;
      var h = 600;
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      window.open(url, "", 'titlebar=yes, toolbar=0, location=0, directories=0, status=0, menubar=0, resizable=no, width='+w+', height='+h+', top='+top+', left='+left);
    });

  },

  triggerDesc: function() {
    $(".brandToggle h4, .name-field.Composicao").trigger("click");
  },

  avaliable: function() {
    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
      console.log(product);
      var disp = product.available;
      if(disp == false){
        $("#fixedPricesProd").addClass("hide");
        $(".coty-product .btn-group .btn-group").addClass("unvaliable");
      }
    });
  },

  countThumbs: function() {
    var cont = $(".coty-product .lin01Col01 img").length;
    //console.log("nums: "+cont);
    setTimeout(function(){
      if(cont == 1){
        $(".coty-product .thumbnail li.slick-active").css("display", "none");
      }
    }, 200);     
  },

  init: function(){

    //Geral
    if (!body.hasClass('coty-quickview')) {
      cotyCall.wrapBtSearch();
      cotyCall.reconheceMobile();
      cotyCall.removeComplement();
      cotyCall.mobileMenu();
      cotyCall.miniCart();
      //cotyCall.autoComplete();
      //cotyCall.wrapSearch();
      cotyCall.backToTop();
      cotyCall.showLogin();
      //cotyCall.corrigeAlturadoNomedoProduto();
      //cotyCall.sliderProductsLarge(".shelf-large  > div > ul");
      cotyCall.sendNews();
    }

    if (body.hasClass('coty-home')) {
      cotyCall.sliderBanners("#bannerPrincipal .cotyDesk, .mobPage #bannerPrincipal .cotyMob");
      cotyCall.sliderBrands(".logoMarcas #logos");
      cotyCall.sliderProducts(".prateleira01 > div > ul, .prateleira03 > div > ul");
      cotyCall.sliderProductsSpecial("#prateleiraEspecColecao > div > ul");
      cotyCall.brandsDescr();
      cotyCall.flagPreco();
      cotyCall.customPrat();
      cotyCall.sliderVideo(".videosHome > div > ul");
      cotyCall.videoCustom();
      cotyCall.instaFeed();
      //cotyCall.wrapInsta();
      //cotyCall.instagramResponsivo();
    }
    if (body.hasClass('coty-silver')) {
      cotyCall.customPratPrata();
    }
    if (body.hasClass('coty-gold')) {
      cotyCall.customPratOuro();
      //cotyCall.instagramResponsivo();
      cotyCall.instaFeed();
    }
    if (body.hasClass('coty-gold-especial')) {
       cotyCall.customPrat();
       cotyCall.sliderProductsSpecial("#prateleiraEspecColecao > div > ul");
       cotyCall.sliderVideo(".videosHome > div > ul");
       cotyCall.videoCustom();
    }
    if (body.hasClass('coty-department') || body.hasClass('coty-category') || body.hasClass('coty-busca')) {
       //cotyCall.paginacao();
       //cotyCall.changeBreadcrumb();
       //cotyCall.tamanhoVitrine(".shelf li");
       cotyCall.mobFilters();
       cotyCall.fixQuickView();
       cotyCall.flagPreco();
       cotyCall.infinityScroll();
       cotyCall.qtdProducts();
       cotyCall.customCheckFilters();
       cotyCall.filters();
       cotyCall.fixBannerHeight();
       cotyCall.orderMobile();
       //cotyCall.hideNull();
       //cotyCall.fixMobBanner();
       //cotyCall.fixScore();
       //cotyCall.brandFiltersForSearch();
       //cotyCall.fixFiltersLayout();
       /*setTimeout(function() {
         cotyCall.colecoes();
       }, 1500);*/
       //cotyCall.orderFilters();
    }
    if (body.hasClass('coty-category')) {
       //cotyCall.fixBack();
       cotyCall.fixCategoryNumbers();
    }
    if (body.hasClass('coty-department')) {
       cotyCall.fixDepartmentNumbers();
    }
    if (body.hasClass('coty-busca')) {
       //cotyCall.brandFiltersForSearch();
       //cotyCall.brandFiltersForSearchv2();
       cotyCall.searchTerm2();
    }
    if (body.hasClass('coty-product')) {
      cotyCall.brandPosition();
      cotyCall.fixBreadcrumb();
      //cotyCall.findVideo();
      cotyCall.imagensDoProduto();
      //cotyCall.customBuy();
      //cotyCall.toggleProduct();
      //cotyCall.shareProduct();
      cotyCall.flagPreco();
      cotyCall.guiaMedidas();
      cotyCall.fixModal();
      cotyCall.removeTags();
      cotyCall.triggerWishlist();
      //cotyCall.fixOneProduct();
      cotyCall.testeThumb();
      cotyCall.sliderProducts(".qvvt > div > ul, .relacionados > div > ul");
      cotyCall.buyButton();
      cotyCall.loadShipping();
      cotyCall.toggleDesc();
      cotyCall.shareButtons();
      cotyCall.msgMediaAvaliacao();
      cotyCall.detalheInputFrete();
      cotyCall.eliminandoTipoDasCaracteristicas();
      cotyCall.changeSocialPlace();
      cotyCall.productBrand();
      cotyCall.descriptionHeight();
      cotyCall.fixMobPrice();
      cotyCall.fixedPrices();
      cotyCall.triggerDesc();
      cotyCall.avaliable();
      cotyCall.countThumbs();
      //cotyCall.countReviews();
    }
    if (body.hasClass('coty-custom-product')) {
      cotyCall.simuladorDeEsmaltes();
      cotyCall.instaFeed();
    } 
    if (body.hasClass('coty-product-insta')) {
      cotyCall.instaFeed();
    } 
    if (body.hasClass('coty-buscavazia')) {
      cotyCall.searchTerm();
    }
    if (body.hasClass('coty-inst')) {
      //cotyCall.hashElements();
      //cotyCall.mobMenuSidebar();
      cotyCall.menuInstitucional();
    }
    if (body.hasClass('coty-wishlist-create')) {
      cotyCall.fixTerms();
    }
    if (body.hasClass('coty-wishlist-manage')) {
      cotyCall.fixList();
    }
    if (body.hasClass('coty-quickview')) {
      //cotyCall.fixNull();
      //cotyCall.customQuick();
    }
    if (body.hasClass('coty-wishlist') || body.hasClass('coty-account')) {
      cotyCall.mobList();
    }
    if (body.hasClass('coty-login')) {
      cotyCall.closeLogin();
    }
    if (body.hasClass('coty-account')) {
      cotyCall.customHello();
      cotyCall.bannerMobile();
    }
    if (body.hasClass('coty-profile')) {
      cotyCall.customCheckAccount();
      cotyCall.customUpdateBt();
    }
    
  }

}

$(document).ready(function() {
  cotyCall.init();
});

//Funções

Number.prototype.formatMoney = function(c, d, t){
var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function injetaScriptdoInstawidget($diretrizes) {

    // Objeto que uso para fazer a mágica

    // var diretrizes = {
    //   place: $('.instagramMain'),  
    //   view1: {
    //     codigo: 'd807733038075b21d25582a400509ae6458256fa16b28ce59ac1c657ba3a746b',
    //     qtdItensHorizontais: 2,
    //     qtdItensVerticais: 2,
    //   },
    //   view2: {
    //     codigo: '4ab07d2fa4415133e1516da773d2ed600218a99acfd4b288c8b77d8c60a8f2f1',
    //     qtdItensHorizontais: 3,
    //     qtdItensVerticais: 2,
    //   },
    //   view3: {
    //     codigo: '5c5cb2b8a796ca37b62608a1262c1cfdebfe769de7975ffc22160538d8538987',
    //     qtdItensHorizontais: 4,
    //     qtdItensVerticais: 2,
    //   },
    // }

    // $(window).resize(checkSize);

    var $code, qtdItensHorizontais, qtdItensVerticais, place, pLeft;

    if ( $(window).width() < 500 ) {
      $code = $diretrizes.view1.codigo;
      qtdItensHorizontais = $diretrizes.view1.qtdItensHorizontais;
      qtdItensVerticais = $diretrizes.view1.qtdItensVerticais;
      pLeft = 'padding-left: calc(6% - 10px)';
    }
    if ( $(window).width() >= 500 && $(window).width() < 768 ) {
      $code = $diretrizes.view2.codigo;
      qtdItensHorizontais = $diretrizes.view2.qtdItensHorizontais;
      qtdItensVerticais = $diretrizes.view2.qtdItensVerticais;
      pLeft = 'padding-left: calc(7% - 15px)';
    }
    else if ( $(window).width() >= 768 ) {
      $code = $diretrizes.view3.codigo;
      qtdItensHorizontais = $diretrizes.view3.qtdItensHorizontais;
      qtdItensVerticais = $diretrizes.view3.qtdItensVerticais;
      pLeft = 'padding-left: calc(10% - 20px)';
    }  

    place = $diretrizes.place;    

    var config = {    
      id: $code,
      style:  'border: 0;'+
              'margin: 0;'+
              'width: 100%;'+
              'height:'+calculaAltura(place, qtdItensHorizontais, qtdItensVerticais)+'px;'+
              'padding: 0;'+
              pLeft,
      scrolling: 'no',    
      frameborder:'no',    
      src: 'https://instawidget.net/embed?u='+$code
    }

    $diretrizes.place.html(
      '<iframe '+
        'id=\"'+config.id+'\" '+
        'style=\"'+config.style+'\" '+
        'scrolling=\"'+config.scrolling+'\" '+
        'frameborder=\"'+config.frameborder+'\" '+
        'src=\"'+config.src+'\">'+
      '</iframe>'
    );  

  function calculaAltura ($place, $qtdItensHorizontais, $qtdItensVerticais) {
        var alturaTotal = (parseInt($place.width() / $qtdItensHorizontais)*$qtdItensVerticais);
        return alturaTotal;
  }
} 

function validateEmail(puEmail) {     
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(puEmail);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function lastLetter(words) {
    var n = words.split(" ");
    return n[n.length - 1];
}

function tentandoCentralizar($event) {
  // console.log($event);
  var thisScroll = $($event).closest('.slick-slider');//$('#logos');      
  //console.log(thisScroll[0].id);
  // if (thisScrol == $('#logos')) {
  if (thisScroll[0].id == 'logos') {
      var clicadoIndex = $event.parent().attr('data-slick-index');
  }
  else {
    var clicadoIndex = $event.attr('data-slick-index'); 
  }
  var currentSlide = thisScroll.slick('slickCurrentSlide');
  var tempoScroll = vSpdSlider*1.5;
  var aCtv = thisScroll.find('.slick-active').length; 
  var activeIndex = [];
       
  if ( aCtv % 2 !== 0 ){
    var cntr = ((aCtv-1)*0.5);
    if (clicadoIndex < currentSlide ) {
      var caminho = currentSlide-clicadoIndex;
      for (i = 0; i < caminho; i++) { 
        setTimeout(function(){              
          thisScroll.slick('slickPrev');
        }, i*tempoScroll);
      }
    } 
    else if (clicadoIndex > currentSlide ) {
      var caminho = clicadoIndex-currentSlide;
      for (i = 0; i < caminho; i++) { 
        setTimeout(function(){              
          thisScroll.slick('slickNext');
        }, i*tempoScroll);
      }
    }
    //selecionaCentral(thisScroll);
    setTimeout(function(){
      selecionaCentral();
    }, i*tempoScroll);
    
  }

}

/*$(window).on("QuatroDigital.is_noMoreResults", function() {
    console.log("sem resultados");
});
$(window).on("QuatroDigital.is_ready", function() {
    console.log("scroll pronto");
});
$(window).on("QuatroDigital.is_Callback", function() {
    console.log("chamei scroll");
});*/


function selecionaCentral() {
  //function selecionaCentral($element) {
  /*var element = $element;
  $element.on('afterChange', function(event, slick, currentSlide){
      if ($element == $('#logos')) {
        var sldLink = $elemen.find('.slick-center a');
        $("ul#logos li a, ul#textos li").removeClass("active");  
        var name = sldLink.attr("class");
        sldLink.addClass("active");
        $("ul#textos ."+name).addClass("active");
      }
  });*/
  var brand = $("#logos .slick-active.slick-current a").attr("class");
  $("ul#textos > li").removeClass("active");
  $("ul#textos > li."+brand).addClass("active");
  console.log("name:"+brand);
}