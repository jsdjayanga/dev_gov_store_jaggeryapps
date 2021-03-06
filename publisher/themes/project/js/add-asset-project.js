$(function () {

    function processBodies() {
        var action = $('#toggle-action').data('action');
        if (action == 'show') {
            $('.accordion-body').collapse('show');
            $('#toggle-action').html("<i class='icon icon-double-angle-up icon-2x'></i>");
            $('#toggle-action').data('action', 'hide');
        } else if (action == 'hide') {
            $('.accordion-body').collapse('hide');
            $('#toggle-action').html("<i class='icon icon-double-angle-down icon-2x'></i>");
            $('#toggle-action').data('action', 'show');
        } else {
            $('#toggle-action').data('action', 'show');
            $('#overview_version').val("1.0.0");
            //set project version as 1.0.0. due to Enterprise Store 1.0.0
        }
    }

    function endsWith(str, suffix) {
        return (str.substring(str.length - 1, str.length) == suffix);
    }

    function startsWith(str, suffix) {
        return (str.substring(0, 1) == suffix);
    }

    //user is "finished typing," do something
    function doneTyping(divId, action) {
        if (action == 1) {
            $(divId).html('<i class="icon-ok-circle" style="color:#008000"/>');
        } else if (action == 2) {
            $(divId).html('<i class="icon-warning-sign" style="color:#FF0000"/> Repository already exists');
        } else if (action == 3) {
            $(divId).html('<i class="icon-warning-sign" style="color:#FF0000"/> project already exists');
        } else if (action == 4) {
            $(divId).html('<i class="icon-warning-sign" style="color:#FF0000"/> Job already exists');
        } else if (action == 5) {
            $(divId).html('<i class="icon-ok-circle" style="color:#008000"/> Please create project manually');
        } else {
            $(divId).html('<i class="icon-remove-circle" style="color:#FF0000"/> Operation failed');
        }

    }

    function processInformation() {
        var vLocation = $('input[name=vcs]:checked').data('location');
        var resourceType = $('input[name=vcs]:checked').data('type');
        if (resourceType) {
            var repoName = $('input[name=svn-location]').val();
            if (resourceType.toLowerCase() === 'svn') {
                var locationEndWith = endsWith(vLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    vLocation = vLocation + repoName;
                } else if (repoStartsWith) {
                    vLocation = vLocation + repoName;
                } else {
                    vLocation = vLocation + '/' + repoName;
                }
            } else if (resourceType.toLowerCase() === 'github') {
                var locationEndWith = endsWith(vLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    vLocation = vLocation + repoName;
                } else if (repoStartsWith) {
                    vLocation = vLocation + repoName;
                } else {
                    vLocation = vLocation + '/' + repoName;
                }

            }
            //alert(vLocation);
            var resourceID = $('input[name=vcs]:checked').data('ids');
            $('input[name=other_vcsresourceid]').val(resourceID);
            $('input[name=other_versioncontrol]').val(vLocation);
            $('input[name=other_versioncontroltype]').val(resourceType);
        } else {
            alert('Please select one of the version control server');
            return false;
        }

        var cLocation = $('input[name=cis]:checked').data('location');
        var cResourceType = $('input[name=cis]:checked').data('type');
        if (cLocation) {
            var repoName = $('input[name=cis-location]').val();
            if (cResourceType.toLowerCase() === 'jenkins') {
                var locationEndWith = endsWith(cLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    cLocation = cLocation + 'job/' + repoName
                } else if (repoStartsWith) {
                    cLocation = cLocation + 'job' + repoName
                } else {
                    cLocation = cLocation + '/job/' + repoName
                }

            } else if (cResourceType.toLowerCase() === 'bamboo') {
                cLocation = cLocation.replace("/allPlans.action", "/browse/");
                var locationEndWith = endsWith(cLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    cLocation = cLocation + repoName
                } else if (repoStartsWith) {
                    cLocation = cLocation + repoName
                } else {
                    cLocation = cLocation + repoName
                }
            }

            var resourceID = $('input[name=cis]:checked').data('ids');
            $('input[name=other_cisresourceid]').val(resourceID);
            $('input[name=other_continuousintegration]').val(cLocation)
            $('input[name=other_continuousintegrationtype]').val(cResourceType);
        } else {
            //alert(cLocation)
        }

        var pLocation = $('input[name=pms]:checked').data('location');
        var pResourceType = $('input[name=pms]:checked').data('type');
        if (pLocation) {
            var repoName = $('input[name=pms-location]').val();

            if (pResourceType.toLowerCase() === 'redmine') {
                var locationEndWith = endsWith(pLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    pLocation = pLocation + 'projects/' + repoName
                } else if (repoStartsWith) {
                    pLocation = pLocation + 'projects' + repoName
                } else {
                    pLocation = pLocation + '/projects/' + repoName
                }
            }
            var resourceID = $('input[name=pms]:checked').data('ids');
            $('input[name=other_pmsresourceid]').val(resourceID);
            $('input[name=other_projectmanagementtool]').val(pLocation)
            $('input[name=other_projectmanagementtooltype]').val(pResourceType)
        } else {
            //alert(pLocation)
        }

        var iLocation = $('input[name=iss]:checked').data('location');
        var iResourceType = $('input[name=iss]:checked').data('type');
        if (iLocation) {
            var repoName = $('input[name=iss-location]').val();
            if (iResourceType.toLowerCase() == 'jira') {
            iLocation = iLocation.replace("/secure/Dashboard.jspa", "/browse");
                var locationEndWith = endsWith(iLocation, '/');
                var repoStartsWith = startsWith(repoName, '/');
                if (locationEndWith) {
                    iLocation = iLocation +  repoName
                } else if (repoStartsWith) {
                    iLocation = iLocation + repoName
                } else {
                    iLocation = iLocation +"/"+  repoName
                }



            }

            var resourceID = $('input[name=iss]:checked').data('ids');
            $('input[name=other_issresourceid]').val(resourceID);
            $('input[name=other_issuetrackertype]').val(iResourceType)
            $('input[name=other_issuetracker]').val(iLocation)
        } else {
            //alert(iLocation)
        }
    }

    $('#toggle-action').click(function () {
        processBodies();
    });

    //===========================================================================================================

    //setup before functions
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 second for example
    var svntrigger = false;


    //on keyup, start the countdown
    $('#svn-location').focusout(function () {
        typingTimer = setTimeout(function () {
            if (svntrigger) {
                var resourceID = $('input[name=vcs]:checked').data('ids');
                var vLocation = $('input[name=vcs]:checked').data('location');
                var resourceType = $('input[name=vcs]:checked').data('type');
                if (resourceID) {
                    var repoName = $('input[name=svn-location]').val();
                    if (resourceType.toLocaleLowerCase() == 'svn') {
                        var locationEndWith = endsWith(vLocation, '/');
                        var repoStartsWith = startsWith(repoName, '/');
                        if (locationEndWith) {
                            vLocation = vLocation + repoName
                        } else if (repoStartsWith) {
                            vLocation = vLocation + repoName
                        } else {
                            vLocation = vLocation + '/' + repoName
                        }
                    } else {
                        vLocation = repoName;
                    }
                    //alert(resourceID +" ----- "+vLocation);
                    $.ajax({
                        url: '/publisher/api/project/validate/' + resourceID,
                        type: 'POST',
                        data: {
                            projectName: vLocation,
                            projectType: resourceType,
                        },
                        success: function (response) {
                            var obj = $.parseJSON(response);
                            if (!obj.status) {
                                //alert('repository location will be created');
                                doneTyping('#svn-hint', 1);
                                processInformation();
                                //alert(resourceID)
                            } else {
                                //alert('repository location already exist');
                                doneTyping('#svn-hint', 2);
                                processInformation();
                            }

                        },
                        error: function (response) {
                            doneTyping('#svn-hint', 9);
                        }
                    });

                } else {
                    //alert(resourceID);
                }
                svntrigger = false;
            }
        }, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $('#svn-location').keydown(function () {
        clearTimeout(typingTimer);
        svntrigger = true;
    });

    //===========================================================================================================
     var cITrigger = false;

    $('#cis-location').focusout(function () {
        typingTimer = setTimeout(function () {
        if(cITrigger){
            var cIResourceID = $('input[name=cis]:checked').data('ids');
            var cLocation = $('input[name=cis]:checked').data('location');
            var resourceType = $('input[name=cis]:checked').data('type');

            if(cIResourceID){
                var cIJobName = $('input[name=cis-location]').val();
                 if (resourceType.toLowerCase() === 'jenkins') {
                    var locationEndWith = endsWith(cLocation, '/');
                    var repoStartsWith = startsWith(cIJobName, '/');
                        if (locationEndWith) {
                            cLocation = cLocation + 'job/' + cIJobName
                        } else if (repoStartsWith) {
                            cLocation = cLocation + 'job' + cIJobName
                        } else {
                            cLocation = cLocation + '/job/' + cIJobName
                        }

                 } else if (resourceType.toLowerCase() === 'bamboo') {
                    cLocation = cLocation.replace("/allPlans.action", "/browse/");
                    var locationEndWith = endsWith(cLocation, '/');
                    var repoStartsWith = startsWith(cIJobName, '/');
                        if (locationEndWith) {
                           cLocation = cLocation + cIJobName
                        } else if (repoStartsWith) {
                           cLocation = cLocation + cIJobName
                        } else {
                           cLocation = cLocation + cIJobName
                        }
                        //temporary
                        cIJobName = cLocation;
                 }
                    $.ajax({
                        url: '/publisher/api/project/validate/' + cIResourceID,
                        type: 'POST',
                        data: {
                            projectName: cIJobName,
                            projectType: resourceType,
                        },
                        success: function (response) {
                            var obj = $.parseJSON(response);
                            if (!obj.status) {
                                //alert('job will be created');
                                  if (resourceType.toLowerCase() === 'jenkins') {
                                       doneTyping('#cis-hint', 1);
                                  }else if (resourceType.toLowerCase() === 'bamboo') {
                                      doneTyping('#cis-hint', 5);
                                  }

                                processInformation();
                                //alert(resourceID)
                            } else {
                                //alert('job already exist');
                                doneTyping('#cis-hint', 4);
                                processInformation();
                            }

                        },
                        error: function (response) {
                            doneTyping('#cis-hint', 9);
                            console.log(response);
                        }

                    });

             cITrigger =false;
            }



        }
        }, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $('#cis-location').keydown(function () {
        clearTimeout(typingTimer);
        cITrigger = true ;
    });

   var pMTracker = false;
    $('#pms-location').focusout(function () {
        typingTimer = setTimeout(function () {
            if (pMTracker) {
                var resourceID = $('input[name=pms]:checked').data('ids');
                var vLocation = $('input[name=pms]:checked').data('location');
                var resourceType = $('input[name=pms]:checked').data('type');
                if (resourceID) {
                    var repoName = $('input[name=pms-location]').val();
                    if (resourceType.toLocaleLowerCase() == 'redmine') {
                        var locationEndWith = endsWith(vLocation, '/');
                        var repoStartsWith = startsWith(repoName, '/');
                        if (locationEndWith) {
                             vLocation = vLocation + 'projects/' + repoName
                        } else if (repoStartsWith) {
                            vLocation = vLocation + 'projects' + repoName
                        } else {
                            vLocation = vLocation + '/projects/' + repoName
                        }
                    } else {
                        vLocation = repoName;
                    }
                    //alert(resourceID +" ----- "+vLocation);
                    $.ajax({
                        url: '/publisher/api/project/validate/' + resourceID,
                        type: 'POST',
                        data: {
                            projectName: repoName,
                            projectType: resourceType,
                        },
                        success: function (response) {
                            var obj = $.parseJSON(response);
                            if (!obj.status) {
                                //alert('project location will be created');
                                doneTyping('#pms-hint', 1);
                                processInformation();
                                //alert(resourceID)
                            } else {
                                //alert('project location already exist');
                                doneTyping('#pms-hint', 3);
                                processInformation();
                            }

                        },
                        error: function (response) {
                            doneTyping('#pms-hint', 9);
                        }
                    });

                } else {
                    //alert(resourceID);
                }
                pMTracker = false;
            }

        }, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $('#pms-location').keydown(function () {
        pMTracker=true;
        clearTimeout(typingTimer);
    });
    var issTracker = false;
    $('#iss-location').focusout(function () {
        typingTimer = setTimeout(function () {
            if (issTracker) {
                var resourceID = $('input[name=iss]:checked').data('ids');
                var vLocation = $('input[name=iss]:checked').data('location');
                var resourceType = $('input[name=iss]:checked').data('type');
                if (resourceID) {
                    var repoName = $('input[name=iss-location]').val();
                    if (resourceType.toLocaleLowerCase() == 'jira') {
                      vLocation = vLocation.replace("/secure/Dashboard.jspa","/browse/");
                        var locationEndWith = endsWith(vLocation, '/');
                        var repoStartsWith = startsWith(repoName, '/');
                        if (locationEndWith) {
                             vLocation = vLocation +repoName
                        } else if (repoStartsWith) {
                            vLocation = vLocation + repoName
                        } else {
                            vLocation = vLocation + repoName
                        }
                    } else {
                        vLocation = repoName;
                    }
                    //alert(resourceID +" ----- "+vLocation);
                    $.ajax({
                        url: '/publisher/api/project/validate/' + resourceID,
                        type: 'POST',
                        data: {
                            projectName: vLocation,
                            projectType: resourceType,
                        },
                        success: function (response) {
                            var obj = $.parseJSON(response);
                            if (!obj.status) {
                                //alert('project location will be created');
                                doneTyping('#iss-hint',1);
                                processInformation();
                                //alert(resourceID)
                            } else {
                                //alert('project location already exist');
                                doneTyping('#iss-hint', 3);
                                processInformation();
                            }

                        },
                        error: function (response) {
                            doneTyping('#iss-hint', 9);
                        }
                    });

                } else {
                    //alert(resourceID);
                }
                pMTracker = false;
            }





            //doneTyping('#iss-hint');
        }, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $('#iss-location').keydown(function () {
        issTracker =true;
        clearTimeout(typingTimer);
    });

    var type = $('#meta-asset-type').val();

    $('#btn-create-asset').on('click', function () {
        processInformation();

    });



    processBodies();
});
