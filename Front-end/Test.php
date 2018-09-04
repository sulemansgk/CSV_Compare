<form action="<?php echo Yii::app()->createUrl('Setting/SocialLinks')?>" role="form" method="post">
<?php $counter = 0; ?>

<div class="row">
<div class="col-md-12">
<div class="portlet box red">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-gift"></i>Social Links
							</div>
						
						</div>
						<div class="portlet-body form">
						
                                      <div class="row pform" style="padding-top:1%;" >
                                          <div class="col-md-12">
										  <div class="table-responsive">
                                              <table class="table table-striped table-hover table-bordered">
                                                  <thead>
                                                  <tr>
                                                      <th style="width: 8%;">Name</th>
                                                      <th >Link</th>
                                                      <th  >Icon</th>
                                                      <th  >Status</th>
                                                      <th  >Action</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody>
                                                  <?php if($model->isNewRecord){ ?>
                                                  <tr class='social_tr'>
                                                      <td><input type="text" class="form-control" name="sl[0][title]"/> </td>
                                                      <td><input type="text" class="form-control" name="sl[0][link]"/> </td>
                                                      <td><select class="form-control" name="sl[0][icon]">
                                                              <option value="">select icon</option>
                                                              <option value="fa fa-facebook"><label>Facebook <i class="fa fa-facebook"></i></label></option>
                                                              <option value="fa fa-twitter"><label>Twitter <i class="fa fa-twitter"></i></label></option>
                                                              <option value="fa fa-google-plus"><label>Google+ <i class="fa fa-google-plus"></i></label></option>
                                                              <option value="fa fa-instagram"><label>Instagram <i class="fa fa-instagram"></i></label></option>
                                                              <option value="fa fa-linkedin"><label>Linkedin <i class="fa fa-linkedin"></i></label></option>
                                                              <option value="fa fa-pinterest"><label>Pinterest <i class="fa fa-pinterest"></i></label></option>
                                                              <option value="fa fa-tumblr"><label>Tumblr <i class="fa fa-tumblr"></i></label></option>
                                                              <option value="fa fa-vimeo"><label>Vimeo <i class="fa fa-vimeo"></i></label></option>
                                                              <option value="fa fa-weibo"><label>Weibo <i class="fa fa-weibo"></i></label></option>
                                                              <option value="fa fa-youtube"><label>Youtube <i class="fa fa-youtube"></i></label></option>
                                                          </select>
                                                      </td>
                                                      <td>
                                                          <select class="form-control" name="sl[0][status]">
                                                              <option value='Enable'>Enable</option>
                                                              <option value='Disable'>Disable</option>
                                                          </select>
                                                      </td>
                                                      <td>
                                                          <button class='add_social_tr btn btn-primary' data-names="">Add More </button>
                                                      </td>
                                                  </tr>
                                                  <?php }else{
                                                      if(!empty($model->value)){
                                                            $links = json_decode($model->value);
                                                          foreach ($links as $key => $data){
                                                              $counter ++;?>
                                                              <tr class='social_tr'>
                                                                  <td><input type="text" class="form-control" name="sl[<?php echo $key?>][title]" value="<?php echo $data->title?>"/> </td>
                                                                  <td><input type="text" class="form-control" name="sl[<?php echo $key?>][link]" value="<?php echo $data->link?>"/> </td>
                                                                  <td><select class="form-control" name="sl[<?php echo $key?>][icon]">
                                                                          <option value="">select icon</option>
                                                                          <option value="fa fa-facebook" <?php if($data->icon == "fa fa-facebook"){ echo "selected";}?>><label>Facebook <i class="fa fa-facebook"></i></label></option>
                                                                          <option value="fa fa-twitter" <?php if($data->icon == "fa fa-twitter"){ echo "selected";}?>><label>Twitter <i class="fa fa-twitter"></i></label></option>
                                                                          <option value="fa fa-google-plus" <?php if($data->icon == "fa fa-google-plus"){ echo "selected";}?>><label>Google+ <i class="fa fa-google-plus"></i></label></option>
                                                                          <option value="fa fa-instagram" <?php if($data->icon == "fa fa-instagram"){ echo "selected";}?>><label>Instagram <i class="fa fa-instagram"></i></label></option>
                                                                          <option value="fa fa-linkedin" <?php if($data->icon == "fa fa-linkedin"){ echo "selected";}?>><label>Linkedin <i class="fa fa-linkedin"></i></label></option>
                                                                          <option value="fa fa-pinterest" <?php if($data->icon == "fa fa-pinterest"){ echo "selected";}?>><label>Pinterest <i class="fa fa-pinterest"></i></label></option>
                                                                          <option value="fa fa-tumblr" <?php if($data->icon == "fa fa-tumblr"){ echo "selected";}?>><label>Tumblr <i class="fa fa-tumblr"></i></label></option>
                                                                          <option value="fa fa-vimeo" <?php if($data->icon == "fa fa-vimeo"){ echo "selected";}?>><label>Vimeo <i class="fa fa-vimeo"></i></label></option>
                                                                          <option value="fa fa-weibo" <?php if($data->icon == "fa fa-weibo"){ echo "selected";}?>><label>Weibo <i class="fa fa-weibo"></i></label></option>
                                                                          <option value="fa fa-youtube" <?php if($data->icon == "fa fa-youtube"){ echo "selected";}?>><label>Youtube <i class="fa fa-youtube"></i></label></option>
                                                                      </select>
                                                                  </td>
                                                                  <td>
                                                                      <select class="form-control" name="sl[<?php echo $key?>][status]">
                                                                          <option value='Enable' <?php if($data->status == "Enable"){ echo "selected";}?>>Enable</option>
                                                                          <option value='Disable' <?php if($data->status == "Disable"){ echo "selected";}?>>Disable</option>
                                                                      </select>
                                                                  </td>
                                                                  <td>
                                                                      <button class='add_social_tr btn btn-primary' data-names="">Add More </button>
                                                                  </td>
                                                              </tr>
                                                         <?php }
                                                      }

                                                    }?>
                                                  <tr  id="add_social_tr_before">
                                                      <td></td>
                                                      <td></td>
                                                      <td></td>
                                                      <td></td>
                                                      <td></td>

                                                  </tr>
                                                  </tbody>
                                              </table>
                                          </div></div>
										<!--<div class="col-md-8">
										<label>Twitter <i class="fa fa-twitter"></i></label>
										<input type="text" name="twitter" class="form-control" value="<?php echo (isset($links->twitter) ? $links->twitter : '')?>" placeholder="Enter Twitter URL"/>
										<label>Facebook <i class="fa fa-facebook"></i></label>
										<input type="text" name="fb" class="form-control" value="<?php echo (isset($links->facebook) ? $links->facebook : '')?>" placeholder="Enter Facebook URL"/>
										<label>Google+ <i class="fa fa-google-plus"></i></label>
										<input type="text" name="gplus" class="form-control" value="<?php echo (isset($links->googleplus) ? $links->googleplus : '')?>" placeholder="Enter Google+ URL"/>
										<label >Instagram <i class="fa fa-instagram"></i></label>
										<input type="text" name="insta" class="form-control" value="<?php echo (isset($links->instagram) ? $links->instagram : '')?>" placeholder="Enter Instagram URL"/>
										</div>-->
										</div>
										 <div class="row pform" style="padding-bottom:1%;padding-top:1%;" >
										<div class="col-md-8">
											<input type="submit" value="Submit" class="btn btn-success" />
										</div>
										</div>
					
						</div>
					</div>
 </div>


</div>


</form><!-- form -->

<style>
	.pform
	{
		padding-left:2%;
		padding-right:2%;
	}

</style>

<script>



    counter = <?php echo $counter?>;


    $("body").on('click','.add_social_tr',function(e){
        counter++;
        // alert(counter);
        e.preventDefault();
        name_attr = $(this).attr('data-names');
        var parent_parent_div = $(this).closest('.social_tr').parent();
        new_div = "";
        new_div += "<tr >";
        new_div += "<td><input type='text' class='form-control' name='sl["+counter+"][title]'/></td> ";
        new_div += "<td><input type='text' class='form-control' name='sl["+counter+"][link]'/></td>";
        new_div += "<td><select class='form-control' name='sl["+counter+"][icon]'>" +
            "<option value=''>Select Icon</option>" +
            "<option value='fa fa-facebook'><label>Facebook <i class='fa fa-facebook'></i></label></option>" +
            "<option value='fa fa-twitter'><label>Twitter <i class='fa fa-twitter'></i></label></option>" +
            "<option value='fa fa-google-plus'><label>Google+ <i class='fa fa-google-plus'></i></label></option>" +
            "<option value='fa fa-instagram'><label>Instagram <i class='fa fa-instagram'></i></label></option>" +
            "<option value='fa fa-linkedin'><label>Linkedin <i class='fa fa-linkedin'></i></label></option>" +
            "<option value='fa fa-pinterest'><label>Pinterest <i class='fa fa-pinterest'></i></label></option>" +
            "<option value='fa fa-tumblr'><label>Tumblr <i class='fa fa-tumblr'></i></label></option>" +
            "<option value='fa fa-vimeo'><label>Vimeo <i class='fa fa-vimeo'></i></label></option>" +
            "<option value='fa fa-weibo'><label>Weibo <i class='fa fa-weibo'></i></label></option>" +
            "<option value='fa fa-youtube'><label>Youtube <i class='fa fa-youtube'></i></label></option>" +
            "</select></td>";

        new_div += "<td>";
        new_div += "<select class='form-control' name='sl["+counter+"][status]'>" +
            "<option value='Enable'>Enable</option>" +
            "<option value='Disable'>Disable</option>" +
            "</select>";
        new_div += "</td>";
        new_div += "<td ><button class='add_social_tr btn btn-primary fa fa-plus'  data-names=''></button>";
        new_div += "<button class='delete_expense_input_field btn btn-danger fa fa-minus' ></button></td>";
        new_div += " </tr>";
        // console.log(new_div);
        //$(parent_parent_div).append(new_div);
        $("#add_social_tr_before").before(new_div);

    });

    $("body").on('click','.delete_expense_input_field',function(e){
        if(counter > 0){
            //counter--;

        }
        e.preventDefault();

        parent_parent_div = $(this).closest('tr').remove();


    });


</script>

