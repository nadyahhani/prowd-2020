<div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}
            >
              <T2>How To :</T2>
              <div
                style={{
                  width: "100%",
                  height: "62.5%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  overflow: "scroll"
                }}
              >
                <div className={classes.howto}>
                  <T4>
                    If you want to check the overall imbalance of the class,
                    leave the Properties input empty, and input the class ID on
                    the class input.
                    <br />
                    Example if you want to check the overall imbalance of the
                    entities of country (Q6256):
                  </T4>
                  <TextField
                    style={{ width: "80%" }}
                    label="Class"
                    value="Q6256"
                    helperText="Input the class ID"
                    disabled
                  />
                  <TextField
                    style={{ width: "80%" }}
                    label="Properties"
                    value=""
                    helperText="Leave empty, or Input multiple properties ID"
                    disabled
                  />
                </div>
                <div className={classes.howto}>
                  <T4>
                    If you want to check the imbalance on specific properties of
                    the class, input the properties' ID separated by commas.
                    <br />
                    Example if you want to check the imbalance of image (P18),
                    capital (P36), coordinate location (P625) of country (Q6256)
                    entities :
                  </T4>
                  <TextField
                    style={{ width: "80%" }}
                    label="Class"
                    value="Q6256"
                    helperText="Input the class ID"
                    disabled
                  />
                  <TextField
                    style={{ width: "80%" }}
                    label="Properties"
                    value="P18,P36,P625"
                    helperText="Leave empty, or Input multiple properties ID"
                    disabled
                  />
                </div>
              </div>
              <T2>Then Press "Run Query"</T2>
            </div>